import { doc, getDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import db from '../../firestoreDB'
import Reviewable, { reviewableSchema } from '../../models/Reviewable'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ReviewablePage from '../ReviewablePage'

export default function ReviewableOr404 () {
  const { guid } = useParams<{guid: string}>()

  const [reviewable, setReviewable] = useState<Reviewable | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    () => {
      getDoc(doc(db, 'reviewables', guid)).then(documentSnapshot => {
        if (!documentSnapshot.exists()) {
          setReviewable(undefined)
          setIsLoading(false)
          return
        }

        const potentialReviewable = documentSnapshot.data()
        try {
          const reviewable = reviewableSchema.parse(potentialReviewable)
          setReviewable(reviewable)
        } catch (error) {
          // The parse failed for some reason, log the error, but otherwise
          // just move on for now unfortunately.
          console.error(
            'ReviewableOr404 failed to parse firestore reviewable:',
            error.message
          )
          setReviewable(undefined)
        }

        setIsLoading(false)
      })
    },
    [guid]
  )

  if (isLoading) {
    return <div className="ReviewableOr404">
      <p><Link to="/">Go back home</Link></p>
      <LoadingSpinner />
    </div>
  }

  if (reviewable) {
    return <div className="ReviewableOr404">
      <p><Link to="/">Go back home</Link></p>
      <ReviewablePage reviewable={reviewable} />
    </div>
  }

  return <div className="ReviewableOr404">
    <h2>Not Found</h2>
    <p>Sorry, but it looks like we can't find what you are looking for.</p>
    <p>But, there's no place like <Link to="/">home</Link>.</p>
  </div>
}
