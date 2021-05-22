import Reviewable from '../../models/Reviewable'
import ReviewablePreview from '../ReviewablePreview'

type Props = {
  reviewable: Reviewable
}

export default function ReviewablePage ({ reviewable }: Props) {
  return <div className="ReviewablePage">
    <ReviewablePreview reviewable={reviewable}/>
    <p>And then also some extra stuff other than the preview.</p>
  </div>
}
