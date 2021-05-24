import Reviewable from '../../models/Reviewable'
import ReviewablePreview from '../ReviewablePreview'
import ReviewForm from '../ReviewForm'
import ReviewList from '../ReviewList'

type Props = {
  reviewable: Reviewable,
  reviewing: boolean
}

export default function ReviewablePage ({ reviewable, reviewing }: Props) {
  return <div className="ReviewablePage">
    <ReviewablePreview
      reviewable={reviewable}
      showLinkToPage={reviewing}
      showLinkToMakeReview={!reviewing}
    />

    {
      reviewing
        ? <ReviewForm reviewable={reviewable} />
        : <ReviewList reviewable={reviewable} />
    }
  </div>
}
