import React, { useState } from 'react'

import Reviewable from '../../models/Reviewable'
import StarRating from '../../models/StarRating'

import Button from '../Button'
import LoadingSpinner from '../LoadingSpinner'
import Stars from '../Stars'

import './styles.css'

const maxNameCharacters = 100
const maxReviewCharacters = 5000

type Props = {
  reviewable: Reviewable
}

export default function ReviewForm ({ reviewable }: Props) {
  const [name, setName] = useState('')
  const [starRating, setStarRating] = useState(StarRating.TwoAndAHalf)
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    setIsLoading(true)
    console.log('TODO: Actually submit.')
  }

  return <form onSubmit={onSubmit} className="ReviewForm">
    <div className="labelAndCounterContainer">
      <label htmlFor="reviewNameInput">Name:</label>
      <span>{name.length} / {maxNameCharacters}</span>
    </div>
    <input
      type="text"
      id="reviewNameInput"
      value={name}
      onChange={event => setName(event.target.value)}
      minLength={1}
      maxLength={maxNameCharacters}
      required
      disabled={isLoading}
    />

    <div className="labelAndCounterContainer">
      <label>Star rating:</label>
      <span>{starRating} / 5 stars</span>
    </div>
    <Stars
      rating={starRating}
      setRating={isLoading ? undefined : setStarRating}
    />

    <div className="labelAndCounterContainer">
      <label htmlFor="reviewTextInput">Review:</label>
      <span>{review.length} / {maxReviewCharacters}</span>
    </div>
    <textarea
      id="reviewTextInput"
      value={review}
      onChange={event => setReview(event.target.value)}
      maxLength={maxReviewCharacters}
      minLength={1}
      required
      disabled={isLoading}
    />

    {
      isLoading
        ? <LoadingSpinner />
        : <Button type='submit'>Submit</Button>
    }
  </form>
}
