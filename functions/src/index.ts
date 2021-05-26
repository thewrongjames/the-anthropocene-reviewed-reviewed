import * as functions from 'firebase-functions'

// This exists as a https function so that the reviews can be validated before
// being written in.
export const postReview = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
