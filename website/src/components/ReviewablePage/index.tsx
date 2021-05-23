import React from 'react'

import Reviewable from '../../models/Reviewable'
import ReviewablePreview from '../ReviewablePreview'
import Button from '../Button'
import Stars from '../Stars'

import './styles.css'

type Props = {
  reviewable: Reviewable
}

export default function ReviewablePage ({ reviewable }: Props) {
  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    console.log('Form submission.')
  }

  return <div className="ReviewablePage">
    <ReviewablePreview reviewable={reviewable}/>
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" />

      <label>Star rating:</label>
      <Stars />

      <label htmlFor="review">Review:</label>
      <textarea id="review" />

      <Button type='submit'>Submit</Button>
    </form>
  </div>
}
