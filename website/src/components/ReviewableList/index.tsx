import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import db from '../../firestoreDB'
import Reviewable, { reviewableSchema } from '../../models/Reviewable'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ReviewablePreview from '../ReviewablePreview'

export default function ReviewableList () {
  const [reviewables, setReviewables] = useState<Reviewable[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    () => {
      const queryToMake = query(
        collection(db, 'reviewables'),
        orderBy('dateOfPublication', 'desc')
      )
      getDocs(queryToMake).then(querySnapshot => {
        const newReviewables: Reviewable[] = []
        querySnapshot.forEach(document => {
          const potentialReviewable = document.data()

          try {
            const reviewable = reviewableSchema.parse(potentialReviewable)
            newReviewables.push(reviewable)
          } catch (error) {
            // The parse failed for some reason, log the error, but otherwise
            // just move on for now unfortunately.
            console.error(
              'ReviewableList failed to parse firestore reviewables:',
              error.message
            )
          }
        })
        setReviewables(newReviewables)
        setIsLoading(false)
      })
    },
    []
  )

  return <div className="ReviewableList">
    {isLoading && <LoadingSpinner />}
    {!isLoading && reviewables.map(reviewable => {
      return <ReviewablePreview
        key={reviewable.guid}
        reviewable={reviewable}
        showLinksToPage
      />
    })}
  </div>
}
