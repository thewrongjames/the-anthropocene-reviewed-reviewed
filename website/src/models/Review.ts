import { z } from 'zod'
import { starRatingSchema } from './StarRating'

export const reviewSchema = z.object({
  name: z.string(),
  starRating: starRatingSchema,
  reviewText: z.string(),
  dateOfCreation: z.object({
    seconds: z.number()
  }).transform(({ seconds }) => new Date(seconds * 1000))
})

export default interface Review extends z.infer<typeof reviewSchema> {}
