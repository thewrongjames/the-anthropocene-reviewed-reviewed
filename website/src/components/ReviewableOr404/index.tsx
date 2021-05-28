import { doc, getDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import db from '../../firestoreDB'
import Reviewable, { reviewableSchema } from '../../models/Reviewable'
import LoadingSpinner from '../LoadingSpinner'
import NotFound from '../NotFound'
import ReviewablePage from '../ReviewablePage'

type Props = {
  reviewing?: boolean
}

export default function ReviewableOr404 ({ reviewing }: Props) {
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

  let content = <NotFound />
  if (isLoading) content = <LoadingSpinner />
  if (reviewable !== undefined) {
    content = <ReviewablePage reviewable={reviewable} reviewing={!!reviewing} />
  }

  return <div className="ReviewableOr404">
    { content }
  </div>
}
