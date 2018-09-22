import firebase from 'firebase'

firebase.initializeApp({
  apiKey: '*****',
  authDomain: '*****',
  databaseURL: '*****',
  projectId: '*****',
  storageBucket: '*****',
  messagingSenderId: '*****',
})

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export { ref, firebaseAuth, facebookProvider }
