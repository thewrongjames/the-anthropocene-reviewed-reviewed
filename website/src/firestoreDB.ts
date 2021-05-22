import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Setup firebase
initializeApp({
  apiKey: 'AIzaSyCrV1x2a4nGNlpYzIRdhCFzfiyzRGF5bxw',
  authDomain: 'anthropocene-reviewed-reviewed.firebaseapp.com',
  projectId: 'anthropocene-reviewed-reviewed'
})

const db = getFirestore()

export default db
