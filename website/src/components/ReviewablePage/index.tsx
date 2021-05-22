import React from 'react'

import Reviewable from '../../models/Reviewable'
import ReviewablePreview from '../ReviewablePreview'
import Button from '../Button'

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

      <p>Stars, somehow, go here.</p>

      <label htmlFor="review">Review:</label>
      <textarea id="review" />

      <Button type='submit'>Submit</Button>
    </form>
  </div>
}
