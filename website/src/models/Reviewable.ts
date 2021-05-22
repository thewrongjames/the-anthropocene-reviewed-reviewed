// The comments are how the property can be extracted from the podcast RSS feed.

export default interface Reviewable {
  guid: string // item.guid
  title: string // item.title
  dateOfPublication: Date // new Date(item.pubDate)
  description: string // item.title.itunes.summary
  url: string // item.link
  imageURL: string // item.itunes.image || feed.image.url
}
