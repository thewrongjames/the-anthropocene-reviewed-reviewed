import {
  collection,
  QueryDocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

import db from '../../firestoreDB'
import Reviewable, { reviewableSchema } from '../../models/Reviewable'
import atBottomOfPage from '../../utilities/atBottomOfPage'
import FilterInput from '../FilterInput'
import LoadingSpinner from '../LoadingSpinner'
import ReviewablePreview from '../ReviewablePreview'

const reviewablesPerPage = 10

const baseReviewablesQuery = query(
  collection(db, 'reviewables'),
  orderBy('dateOfPublication', 'desc'),
  limit(reviewablesPerPage)
)

const getReviewableIfValid = (
  queryDocumentSnapshot: QueryDocumentSnapshot<unknown>
): Reviewable | undefined => {
  try {
    const reviewable = reviewableSchema.parse(queryDocumentSnapshot.data())
    return reviewable
  } catch (error) {
    // The parse failed for some reason, log the error, but otherwise
    // just move on for now unfortunately.
    console.error(
      'ReviewableList failed to parse firestore reviewables:',
      error.message
    )
    return undefined
  }
}

export default function ReviewableList () {
  const [reviewables, setReviewables] = useState<Reviewable[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // Undefined means we haven't gotten any yet, or there are none left.
  const [lastReviewable, setLastReviewable] =
    useState<QueryDocumentSnapshot<unknown>>()
  const [filterString, setFilterString] = useState('')

  // Get the first reviewables.
  useEffect(
    () => {
      setIsLoading(true)
      getDocs(baseReviewablesQuery).then(querySnapshot => {
        const newReviewables: Reviewable[] = []
        querySnapshot.forEach(snapshot => {
          const potentialReviewable = getReviewableIfValid(snapshot)
          if (potentialReviewable) newReviewables.push(potentialReviewable)
        })
        setLastReviewable(querySnapshot.docs[querySnapshot.docs.length - 1])
        setReviewables(newReviewables)
        setIsLoading(false)
      })
    },
    []
  )

  // Handle getting the next reviewables.
  useEffect(
    () => {
      // Defined inside the effect to help the linter make sure I catch all the
      // dependencies.
      const getNextReviewables = async () => {
        // Get the next reviewables, if we are at the bottom of the page are not
        // currently loading, and have not got to the end (as indicated by an
        // undefined lastReviewable).
        if (!atBottomOfPage() || isLoading || lastReviewable === undefined) {
          return
        }

        setIsLoading(true)

        const queryToMake = query(
          baseReviewablesQuery,
          startAfter(lastReviewable)
        )

        const querySnapshot = await getDocs(queryToMake)
        setLastReviewable(querySnapshot.docs[querySnapshot.docs.length - 1])

        const newReviewables: Reviewable[] = [...reviewables]

        querySnapshot.forEach(snapshot => {
          const potentialReviewable = getReviewableIfValid(snapshot)
          if (potentialReviewable) newReviewables.push(potentialReviewable)
        })

        setReviewables(newReviewables)
        setIsLoading(false)
      }

      // This is so that after loading some we always load more if we aren't at
      // the bottom yet.
      getNextReviewables()

      window.addEventListener('scroll', getNextReviewables)

      return () => window.removeEventListener('scroll', getNextReviewables)
    },
    [isLoading, lastReviewable, reviewables, filterString]
  )

  return <div className="ReviewableList">
    <FilterInput
      filterString={filterString}
      setFilterString={setFilterString}
      placeholder="Filter reviewables by title or description..."
    />
    {
      reviewables
        .filter(reviewable => {
          const lowerFilter = filterString.toLowerCase()
          return reviewable.title.toLowerCase().includes(lowerFilter) ||
            reviewable.description.toLowerCase().includes(lowerFilter)
        })
        .map(reviewable => {
          return <ReviewablePreview
          key={reviewable.guid}
          reviewable={reviewable}
          showLinkToPage
          showLinkToMakeReview
          />
        })
    }
    {/*
      We could get a bunch but have none display because of a filter, we don't
      want the loading bar to flicker on and off if that happens, so, whilst we
      didn't get nothing last time (i.e. there might still be more to load), we
      show the loading spinner. If the user sees it we should be triggering
      loading anyway.
    */}
    {(isLoading || lastReviewable !== undefined) && <LoadingSpinner />}
  </div>
}
