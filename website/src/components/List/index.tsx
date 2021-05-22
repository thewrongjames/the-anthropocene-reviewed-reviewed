import Reviewable from '../../models/Reviewable'
import ReviewablePreview from '../ReviewablePreview'

const reviewables: Reviewable[] = [
  {
    guid: '3b4f4545-b405-4760-b798-8964c8d2c7d0',
    title: 'Icelandic Hot Dog Stand and Signing Your Name 250,000 Times',
    dateOfPublication: new Date('Tue, 18 May 2021 11:00:00 +0000'),
    description: 'John Green reviews an Icelandic hot dog stand and the act of signing your name 250,000 times in a four-month period.',
    url: 'https://the-anthropocene-reviewed.simplecast.com/episodes/icelandic-hot-dog-stand-signing-your-name-250-000-times-HOpv09_2',
    imageURL: 'https://image.simplecastcdn.com/images/2dcfae8f-b2e0-4826-a483-1306d3b8be06/63f0b865-d62a-418c-9620-1bd4c6778e02/3000x3000/untitled-artwork-3.jpg?aid=rss_feed'
  },
  {
    guid: 'f0fc874e-da70-40a3-be1b-8570dba9bac4',
    title: 'Penguins of Madagascar and the Smallpox Vaccine',
    dateOfPublication: new Date('Thu, 29 Apr 2021 07:00:00 +0000'),
    description: 'John Green reviews the opening scene of the movie Penguins of Madagascar and the smallpox vaccine. The Anthropocene Reviewed book will be released on May 18, 2021 and is available for preorder now. Tour details in show notes!',
    url: 'https://the-anthropocene-reviewed.simplecast.com/episodes/penguins-of-madagascar-smallpox-vaccine-dZN9eB8z',
    imageURL: 'https://image.simplecastcdn.com/images/2dcfae8f-b2e0-4826-a483-1306d3b8be06/a374c3fa-674f-4279-80b9-94fb8e402622/3000x3000/unnamed.jpg?aid=rss_feed'
  }
]

export default function List () {
  return <div className="List">
    {reviewables.map(reviewable => {
      return <ReviewablePreview
        key={reviewable.guid}
        reviewable={reviewable}
        showLinksToPage
      />
    })}
  </div>
}
