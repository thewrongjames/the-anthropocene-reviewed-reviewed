import { collection, doc, getDocs, query, where } from '@firebase/firestore'
import { useEffect } from 'react'

import db from '../../firestoreDB'
import Review from '../../models/Review'
import Reviewable from '../../models/Reviewable'
import Stars from '../Stars'

import './styles.css'

const reviews: Review[] = [
  {
    name: 'Zaphod Beeblbrox\'s Psychologist',
    starRating: 3,
    reviewText: 'Zaphod\'s just this guy, you know?',
    dateOfCreation: new Date()
  },
  {
    name: 'Slarty Bartfast',
    starRating: 1.5,
    reviewText: 'I told you my name wasn\'t important.',
    dateOfCreation: new Date()
  }
]

type Props = {
  reviewable: Reviewable
}

export default function ReviewList ({ reviewable }: Props) {
  useEffect(
    () => {
      const reviewableReference = doc(db, 'reviewables', reviewable.guid)
      const reviewsReference = collection(db, 'reviews')
      const reviewsQuery = query(reviewsReference, where('someReference', '==', reviewableReference))
      getDocs(reviewsQuery).then(querySnapshot => {
        console.log(querySnapshot.size)
        querySnapshot.forEach(document => {
          console.log(document.data())
        })
      })
    }
  )

  return <div className="ReviewList">
    {reviews.map((review, index) => <div className="review" key={index}>
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
    </div>)}
  </div>
}
