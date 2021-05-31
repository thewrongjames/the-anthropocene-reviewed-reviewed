import { doc, runTransaction } from '@firebase/firestore'
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import db from '../../firestoreDB'
import Reviewable, { reviewableSchema } from '../../models/Reviewable'
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
      // We need to generate the new review ID on the client because we need to
      // set it on the reviewable, so that the firestore rules can check that
      // update to the average star rating is correct.
      const newReviewID = uuidv4()

      await runTransaction(db, async (transaction) => {
        const reviewableReference = doc(db, 'reviewables', reviewable.guid)
        const currentReviewableDocumentSnapshot = await transaction.get(
          reviewableReference
        )
        let currentReviewable: Reviewable

        try {
          currentReviewable = reviewableSchema
            .parse(currentReviewableDocumentSnapshot.data())
        } catch (error) {
          console.error(
            'ReviewFrom failed to parse firestore Reviewable:',
            error.message
          )
          throw error
        }

        await transaction.set(
          doc(db, 'reviews', newReviewID),
          {
            name,
            starRating,
            reviewText,
            dateOfCreation: new Date(),
            reviewableGUID: reviewable.guid
          }
        )

        await transaction.update(
          reviewableReference,
          {
            numberOfReviews: currentReviewable.numberOfReviews + 1,
            starRatingTotal: currentReviewable.starRatingTotal + starRating,
            lastAddedReviewID: newReviewID
          }
        )
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
