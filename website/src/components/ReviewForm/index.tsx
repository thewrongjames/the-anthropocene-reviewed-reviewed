import { addDoc, collection } from '@firebase/firestore'
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import db from '../../firestoreDB'

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
  const [reviewText, setReviewText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [didError, setDidError] = useState(false)

  // Pretty confident that this is not the best way to do this...
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setDidError(false)

    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        starRating,
        reviewText,
        dateOfCreation: new Date(),
        reviewableGUID: reviewable.guid
      })
      setShouldRedirect(true)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setDidError(true)
    }
  }

  return <form onSubmit={onSubmit} className="ReviewForm">
    {shouldRedirect && <Redirect to={'/reviewables/' + reviewable.guid} />}

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
      <span>{reviewText.length} / {maxReviewCharacters}</span>
    </div>
    <textarea
      id="reviewTextInput"
      value={reviewText}
      onChange={event => setReviewText(event.target.value)}
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

    {didError && <p className="errorMessage">
      Sorry, something went wrong. Please try again later.
    </p>}
  </form>
}
