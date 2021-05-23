import { z } from 'zod'

enum StarRating {
  Half = 0.5,
  One = 1,
  OneAndAHalf = 1.5,
  Two = 2,
  TwoAndAHalf = 2.5,
  Three = 3,
  ThreeAndAHalf = 3.5,
  Four = 4,
  FourAndAHalf = 4.5,
  Five = 5
}

export const starRatingSchema = z.nativeEnum(StarRating)

export default StarRating
