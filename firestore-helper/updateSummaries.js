const admin = require('firebase-admin')
const Parser = require('rss-parser')
const serviceAccount = require('./service-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()
const parser = new Parser()

// For each of the reviewables...
db.collection('reviewables').get().then(snapshot => snapshot.forEach(
  reviewableDoc => db.runTransaction(async (transaction) => {
    console.log('Updating', reviewableDoc.id)
    const reviewsQuerySnapshot = await transaction.get(
      db.collection('reviews')
        .where('reviewableGUID', '==', reviewableDoc.id)
    )

    const numberOfReviews = reviewsQuerySnapshot.size
    let starRatingTotal = 0
    reviewsQuerySnapshot.forEach(reviewDoc => {
      starRatingTotal += reviewDoc.data().starRating
    })

    await transaction.update(
      reviewableDoc.ref,
      { numberOfReviews, starRatingTotal }
    )
    console.log('Done', reviewableDoc.id)
  })
))