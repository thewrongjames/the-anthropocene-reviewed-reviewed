import { Link } from 'react-router-dom'

import Reviewable from '../../models/Reviewable'
import Button from '../Button'
import Stars from '../Stars'

import './styles.css'

type Props = {
  reviewable: Reviewable
  showLinkToPage?: boolean
  showLinkToMakeReview?: boolean
}

export default function ReviewablePreview ({
  reviewable,
  showLinkToPage,
  showLinkToMakeReview
}: Props) {
  const averageRating = reviewable.starRatingTotal / reviewable.numberOfReviews

  return <div className="ReviewablePreview">
    <img src={reviewable.imageURL} alt={reviewable.title}></img>
    <div>
      <h2>{reviewable.title}</h2>
      <p className="date">
        {reviewable.dateOfPublication.toLocaleDateString()}
      </p>
      <div className="summaryOfReviews">
        {
          reviewable.numberOfReviews > 0 &&
          <Stars rating={Math.round(2 * averageRating) / 2}/>
        }
        <span>{reviewable.numberOfReviews} review{
          reviewable.numberOfReviews !== 1 ? 's' : ''
        }</span>
      </div>
      <p>{reviewable.description}</p>
      <div className="buttonRow">
        {
          showLinkToMakeReview &&
          <Link to={`/reviewables/${reviewable.guid}/review`}>
            <Button>Write a Review</Button>
          </Link>
        }
        {showLinkToPage && <Link to={`/reviewables/${reviewable.guid}`}>
          <Button>View Reviews</Button>
        </Link>}
        <a href={reviewable.url} target="_blank" rel="noreferrer">
          <Button>Visit</Button>
        </a>
      </div>
    </div>
  </div>
}
