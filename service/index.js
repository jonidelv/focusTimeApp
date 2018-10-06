import { firebaseAuth, facebookProvider, ref } from '../config'

export function authWithToken(accesToken) {
  return firebaseAuth.signInAndRetrieveDataWithCredential(facebookProvider.credential(accesToken))
}

export function updateUser(user) {
  return Promise.all([
    ref.child(`users/${user.uid}`).set(user),
    ref.child(`scores/${user.uid}`).update(user),
  ])
}

export function logout() {
  firebaseAuth.signOut()
  ref.off()
}

export function setTimer(duration, uid) {
  return ref.child(`settings/${uid}/timerDuration`).set(duration)
}

export function setRest(duration, uid) {
  return ref.child(`settings/${uid}/restDuration`).set(duration)
}

export function fetchSettings(uid) {
  return ref
    .child(`settings/${uid}`)
    .once('value')
    .then(snapshot => {
      const timerDuration = 20
      const restDuration = 5
      const settings = snapshot.val()
      if (settings === null) {
        return {
          timerDuration,
          restDuration,
        }
      } else if (!settings.timerDuration) {
        return {
          timerDuration,
          restDuration: settings.restDuration,
        }
      } else if (!settings.restDuration) {
        return {
          restDuration,
          timerDuration: settings.timerDuration,
        }
      } else {
        return settings
      }
    })
    .catch(() => ({
      timerDuration: 20,
      restDuration: 5,
    }))
}

export function fetchUser(uid) {
  return ref
    .child(`users/${uid}`)
    .once('value')
    .then(snapshot => snapshot.val())
}

export function fetchScore(uid) {
  return ref
    .child(`scores/${uid}`)
    .once('value')
    .then(snapshot => snapshot.val())
}

export function increaseScore(uid, amount) {
  return ref.child(`scores/${uid}/score`).transaction(score => (score += amount))
}

export function decreaseScore(uid, amount) {
  return ref.child(`scores/${uid}/score`).transaction(score => (score -= amount))
}
