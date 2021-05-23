import React, { useState } from 'react'

import Reviewable from '../../models/Reviewable'
import ReviewablePreview from '../ReviewablePreview'
import Button from '../Button'
import Stars from '../Stars'
import ReviewList from '../ReviewList'

import './styles.css'
import StarRating from '../../models/StarRating'

const maxNameCharacters = 100
const maxReviewCharacters = 5000

type Props = {
  reviewable: Reviewable
}

export default function ReviewablePage ({ reviewable }: Props) {
  const [name, setName] = useState('')
  const [starRating, setStarRating] = useState(StarRating.TwoAndAHalf)
  const [review, setReview] = useState('')

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    console.log('Form submission.')
  }

  return <div className="ReviewablePage">
    <ReviewablePreview reviewable={reviewable}/>

    <h2>Write a Review</h2>

    <form onSubmit={onSubmit}>
      <div className="labelAndCounterContainer">
        <label htmlFor="name">Name:</label>
        <span>{name.length} / {maxNameCharacters}</span>
      </div>
      <input
        type="text"
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
        maxLength={maxNameCharacters}
      />

      <div className="labelAndCounterContainer">
        <label>Star rating:</label>
        <span>{starRating} / 5 stars</span>
      </div>
      <Stars rating={starRating} setRating={setStarRating}/>

      <div className="labelAndCounterContainer">
        <label htmlFor="review">Review:</label>
        <span>{review.length} / {maxReviewCharacters}</span>
      </div>
      <textarea
        id="review"
        value={review}
        onChange={event => setReview(event.target.value)}
        maxLength={maxReviewCharacters}
      />

      <Button type='submit'>Submit</Button>
    </form>

    <h2>Reviews</h2>

    <ReviewList reviewable={reviewable} />
  </div>
}
