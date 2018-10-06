import ActionTypes from '../constants/ActionTypes'
import { createAction } from 'redux-actions'
import { AsyncStorage } from 'react-native'
import Request from '../utils/Request'
import NavigationService from '../utils/NavigationService'
import Logout from '../utils/Logout'
import { ref } from '../config'
import {
  authWithToken,
  updateUser,
  setTimer,
  setRest,
  fetchSettings,
  fetchScore,
  fetchUser,
  increaseScore,
  decreaseScore,
} from '../service'
import Toast from 'react-native-root-toast'
import Colors from '../constants/Colors'

export const login = createAction(ActionTypes.LOGIN)
export const logout = createAction(ActionTypes.LOGOUT)
export const changeNavigation = createAction(ActionTypes.CHANGE_NAVIGATION)
export const addTimerDuration = createAction(ActionTypes.ADD_TIMER_DURATION)
export const addRestDuration = createAction(ActionTypes.ADD_REST_DURATION)
export const addUser = createAction(ActionTypes.ADD_USER)
export const addMultipleUsers = createAction(ActionTypes.ADD_MULTIPLE_USERS)
export const fetchingScore = createAction(ActionTypes.FETCHING_SCORE)
export const fetchingScoreSuccess = createAction(ActionTypes.FETCHING_SCORE_SUCCESS)
export const updateLeaderboard = createAction(ActionTypes.UPDATE_LEADERBOARD)
export const addListener = createAction(ActionTypes.ADD_LISTENER)
export const addScores = createAction(ActionTypes.ADD_SCORES)
export const incrementScore = createAction(ActionTypes.INCREMENT_SCORE)
export const decrementScore = createAction(ActionTypes.DECREMENT_SCORE)

export function makeLogin() {
  return async dispatch => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('590588907994139', {
        permissions: ['public_profile'],
      })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const user = await Request(`https://graph.facebook.com/me?access_token=${token}`)
        const data = await authWithToken(token)
        const displayName = user.name
        delete user.id
        delete user.name
        const { photoURL, uid } = data.user
        user.photoURL = photoURL
        user.displayName = displayName
        await updateUser({ uid, ...user })
        dispatch(login({ token, user, uid }))
        const settings = await fetchSettings(uid)
        dispatch(addTimerDuration(settings.timerDuration))
        dispatch(addRestDuration(settings.restDuration))
        dispatch(fetchAndHandleScore(uid))
        await AsyncStorage.setItem('userToken', JSON.stringify({ token, user, uid, settings }))
        NavigationService.navigate('Main')
      }
      return Promise.resolve()
    } catch (error) {
      console.warn('Error on Facebook Login', error)
      toast('Error, please try again later', 0, '#d50001')
      NavigationService.navigate('Auth')
      return Promise.reject()
    }
  }
}

export function makeLogout() {
  return Logout
}

export function changeTimerDuration(duration) {
  return async (dispatch, getstate) => {
    try {
      const response = await setTimer(duration, getstate().user.uid)
      dispatch(addTimerDuration(duration))
      toast('Duration Saved', -80, Colors.blue)
      return response
    } catch (error) {
      console.warn('Error on cghange timer duration save feature', error)
      toast('Error, please try again later', 0, '#d50001')
      return Promise.reject()
    }
  }
}

export function changeRestDuration(duration) {
  return async (dispatch, getstate) => {
    try {
      const response = await setRest(duration, getstate().user.uid)
      dispatch(addRestDuration(duration))
      toast('Duration Saved', -80, Colors.blue)
      return response
    } catch (error) {
      console.warn('Error on cghange rest duration save feature', error)
      toast('Error, please try again later', 0, '#d50001')
      return Promise.reject()
    }
  }
}

function toast(msg, position, backgroundColor) {
  Toast.show(msg, {
    position,
    backgroundColor,
  })
}

export function fetchAndHandleScore(uid) {
  return async dispatch => {
    try {
      dispatch(fetchingScore())
      const scoreInfo = await fetchScore(uid)
      dispatch(
        fetchingScoreSuccess({
          uid,
          score: !scoreInfo || !scoreInfo.score ? 0 : scoreInfo.score,
        })
      )
      if (scoreInfo) {
        dispatch(
          addUser({
            uid,
            user: {
              uid,
              displayName: scoreInfo.displayName,
              photoURL: scoreInfo.photoURL,
            },
          })
        )
      } else {
        const user = await fetchUser(uid)
        dispatch(addUser({ uid, user }))
      }
      return Promise.resolve()
    } catch (error) {
      console.warn('Error fetching score', error)
      toast('Error, please try again later', 0, '#d50001')
      return Promise.reject()
    }
  }
}

export function fetchAndSetScoresListener() {
  return dispatch => {
    let listenerSet = false
    ref
      .child('scores')
      .orderByChild('score')
      .limitToLast(15)
      .on('value', snapshot => {
        const scores = snapshot.val() || {}

        const leaderboardUids = Object.keys(scores)
          .sort((a, b) => scores[b].score - scores[a].score)
          .filter(uid => !!scores[uid].score || scores[uid].score > 0)

        const { justScores, users } = leaderboardUids.reduce(
          (prev, uid) => {
            prev.justScores[uid] = scores[uid].score
            prev.users[uid] = {
              displayName: scores[uid].displayName,
              photoURL: scores[uid].photoURL,
              uid: scores[uid].uid,
            }
            return prev
          },
          { justScores: {}, users: {} }
        )

        dispatch(updateLeaderboard(leaderboardUids))
        dispatch(addScores(justScores))
        dispatch(addMultipleUsers(users))

        if (!listenerSet) {
          dispatch(addListener())
          listenerSet = true
        }
      })
  }
}

export function incrementAndHandleScore(amount) {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().user
      dispatch(incrementScore({ uid, amount }))
      await increaseScore(uid, amount)
      return Promise.resolve()
    } catch (error) {
      console.warn('Error on Increment Score feature', error)
      dispatch(decrementScore({ uid, amount }))
      toast('Error updating your state', 0, '#d50001')
      return Promise.reject()
    }
  }
}

export function decrementAndHandleScore(amount) {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().user
      dispatch(decrementScore({ uid, amount }))
      await decreaseScore(uid, amount)
      return Promise.resolve()
    } catch (error) {
      console.warn('Error on Decrement Score feature', error)
      dispatch(incrementScore({ uid, amount }))
      toast('Error updating your state', 0, '#d50001')
      return Promise.reject()
    }
  }
}
