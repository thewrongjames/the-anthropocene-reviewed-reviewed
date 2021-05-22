import { z } from 'zod'

// The comments are how the property can be extracted from the podcast RSS feed.

export const reviewableSchema = z.object({
  guid: z.string(), // encodeURIComponent(item.guid)
  title: z.string(), // item.title
  // new Date(item.pubDate), kind of, it's evidently a little more complicated.
  // This schema is designed to take the object from firestore.
  dateOfPublication: z.object({
    seconds: z.number()
  }).transform(({ seconds }) => new Date(seconds * 1000)),
  description: z.string(), // item.itunes.summary
  url: z.string(), // item.link
  imageURL: z.string() // item.itunes.image || feed.image.url
})

export default interface Reviewable extends z.infer<typeof reviewableSchema> {}
