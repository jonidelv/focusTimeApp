import firebase from 'firebase'
import { Firebase } from '../constants/Auth'

firebase.initializeApp(Firebase)

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export { ref, firebaseAuth, facebookProvider }
