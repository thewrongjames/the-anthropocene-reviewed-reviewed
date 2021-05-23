import { Link } from 'react-router-dom'

import Reviewable from '../../models/Reviewable'
import Button from '../Button'

import './styles.css'

type Props = {
  reviewable: Reviewable
  showLinksToPage?: boolean
}

export default function ReviewablePreview ({
  reviewable,
  showLinksToPage
}: Props) {
  return <div className="ReviewablePreview">
    <img src={reviewable.imageURL} alt={reviewable.title}></img>
    <div>
      <h2>{reviewable.title}</h2>
      <p className="date">{reviewable.dateOfPublication.toLocaleDateString()}</p>
      <p>{reviewable.description}</p>
      <div className="buttonRow">
        {showLinksToPage && <>
          <Link to={`/reviewables/${reviewable.guid}`}>
            <Button>Write a Review</Button>
          </Link>
          <Link to={`/reviewables/${reviewable.guid}`}>
            <Button>View Reviews</Button>
          </Link>
        </>}
        <a href={reviewable.url} target="_blank" rel="noreferrer">
          <Button>Visit</Button>
        </a>
      </div>
    </div>
  </div>
}
