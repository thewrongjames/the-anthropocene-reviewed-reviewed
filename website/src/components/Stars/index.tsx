import React from 'react'
import { ReactSVG } from 'react-svg'

import StarRating from '../../models/StarRating'

import './styles.css'

type Props = {
  rating: StarRating,
  setRating?: (rating: StarRating) => void
}

export default function Stars ({ rating, setRating }: Props) {
  const stars: React.ReactElement[] = []
  for (let i = 1; i <= 10; i++) {
    const starValue = i / 2
    stars.push(
      <div
        onClick={() => setRating && setRating(starValue)}
        data-checked={starValue <= rating}
        data-editable={!!setRating}
        key={starValue}
      >
        <ReactSVG
          src='/half-star.svg'
        />
      </div>
    )
  }

  return <div className="Stars">
    {stars}
  </div>
}
