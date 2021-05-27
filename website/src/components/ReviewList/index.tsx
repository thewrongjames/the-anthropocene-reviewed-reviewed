import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  QueryDocumentSnapshot,
  startAfter
} from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import db from '../../firestoreDB'
import Review, { reviewSchema } from '../../models/Review'
import Reviewable from '../../models/Reviewable'
import atBottomOfPage from '../../utilities/atBottomOfPage'
import FilterInput from '../FilterInput'
import LoadingSpinner from '../LoadingSpinner'
import Stars from '../Stars'

import './styles.css'

const reviewsPerPage = 10

const baseReviewsQuery = query(
  collection(db, 'reviews'),
  orderBy('dateOfCreation', 'desc'),
  limit(reviewsPerPage)
)

const getReviewIfValid = (
  queryDocumentSnapshot: QueryDocumentSnapshot<unknown>
): Review | undefined => {
  try {
    const review = reviewSchema.parse(queryDocumentSnapshot.data())
    return review
  } catch (error) {
    // The parse failed for some reason, log the error, but otherwise
    // just move on for now unfortunately.
    console.error(
      'ReviewList failed to parse firestore reviews:',
      error.message
    )
    return undefined
  }
}

type Props = {
  reviewable: Reviewable
}

export default function ReviewList ({ reviewable }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [lastReview, setLastReview] = useState<QueryDocumentSnapshot<unknown>>()
  const [filterString, setFilterString] = useState('')

  // Get the first reviews.
  useEffect(
    () => {
      setIsLoading(true)
      const reviewsQuery = query(
        baseReviewsQuery,
        where('reviewableGUID', '==', reviewable.guid)
      )
      getDocs(reviewsQuery).then(querySnapshot => {
        const newReviews: Review[] = []
        querySnapshot.forEach(snapshot => {
          const potentialReview = getReviewIfValid(snapshot)
          if (potentialReview) newReviews.push(potentialReview)
        })
        setLastReview(querySnapshot.docs[querySnapshot.docs.length - 1])
        setReviews(newReviews)
        setIsLoading(false)
      })
    },
    [reviewable]
  )

  // Handle getting the next reviews.
  useEffect(
    () => {
      // Defined inside the effect to help the linter make sure I catch all the
      // dependencies.
      const getNextReviews = async () => {
        // Get the next reviews, if we are at the bottom of the page are not
        // currently loading, and have not got to the end (as indicated by an
        // undefined lastReview).
        if (!atBottomOfPage() || isLoading || lastReview === undefined) {
          return
        }

        setIsLoading(true)

        const queryToMake = query(
          baseReviewsQuery,
          where('reviewableGUID', '==', reviewable.guid),
          startAfter(lastReview)
        )

        const querySnapshot = await getDocs(queryToMake)
        setLastReview(querySnapshot.docs[querySnapshot.docs.length - 1])

        const newReviews: Review[] = [...reviews]

        querySnapshot.forEach(snapshot => {
          const potentialReview = getReviewIfValid(snapshot)
          if (potentialReview) newReviews.push(potentialReview)
        })

        setReviews(newReviews)
        setIsLoading(false)
      }

      // This is so that after loading some we always load more if we aren't at
      // the bottom yet.
      getNextReviews()

      window.addEventListener('scroll', getNextReviews)

      return () => window.removeEventListener('scroll', getNextReviews)
    },
    [isLoading, lastReview, reviews, reviewable, filterString]
  )

  return <div className="ReviewList">
    <FilterInput
      filterString={filterString}
      setFilterString={setFilterString}
      placeholder="Filter reviews by name or review content..."
    />
    {!isLoading && reviews.length === 0 && <p>
      There aren't any reviews yet. Perhaps you'd like
      to <Link to={`/reviewables/${reviewable.guid}/review`}>add one</Link>?
    </p>}
    {
      reviews
        .filter(review => {
          const lowerFilter = filterString.toLowerCase()
          return review.name.toLowerCase().includes(lowerFilter) ||
            review.reviewText.toLowerCase().includes(lowerFilter)
        })
        .map((review, index) =>
          <div className="review" key={index}>
            <div className="reviewHeading">
              <div className="nameAndDate">
                <h3>{review.name}</h3>
                <span className="date">{review.dateOfCreation.toLocaleString()}</span>
              </div>
              <Stars rating={review.starRating} />
              <div className="reviewText">
                <span>{review.reviewText}</span>
              </div>
            </div>
          </div>
        )
    }
    {isLoading && <LoadingSpinner />}
  </div>
}
