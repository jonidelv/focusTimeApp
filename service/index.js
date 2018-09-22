import { firebaseAuth, facebookProvider, ref } from '../config'

export function authWithToken(accesToken) {
  return firebaseAuth.signInAndRetrieveDataWithCredential(facebookProvider.credential(accesToken))
}

export function updateUser(user) {
  return ref.child(`users/${user.uid}`).set(user)
}
