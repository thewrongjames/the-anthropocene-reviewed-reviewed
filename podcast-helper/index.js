const admin = require('firebase-admin')
const Parser = require('rss-parser')
const serviceAccount = require('./service-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()
const parser = new Parser();

(async () => {
  const snapshot = await db.collection('reviewables').get()
  const existingReviewables = {}
  snapshot.forEach(doc => {
    // I only use the id at the moment, but maybe I would want to check in case
    // other things were wrong / had changed.
    existingReviewables[doc.id] = {
      guid: doc.id,
      ...doc.data()
    }
  })

  const feed = await parser.parseURL('https://feeds.simplecast.com/p7S4nr_h');
  
  let numberAdded = 0
  for (const item of feed.items) {
    const reviewable = {
      guid: encodeURIComponent(item.guid),
      title: item.title,
      dateOfPublication: new Date(item.pubDate),
      description: item.itunes.summary,
      url: item.link,
      imageURL: item.itunes.image || feed.image.url
    }

    // If the podcast has already been added, we don't need to add it.
    if (existingReviewables[reviewable.guid]) continue

    console.log('Adding', reviewable.guid)
    console.log(reviewable)
    const documentReference = db.collection('reviewables').doc(reviewable.guid)
    await documentReference.set(reviewable)
    console.log('Done')
    numberAdded += 1
  }

  console.log('Added', numberAdded)
})()