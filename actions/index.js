import ActionTypes from '../constants/ActionTypes'
import { createAction } from 'redux-actions'
import { AsyncStorage } from 'react-native'
import Request from '../utils/Request'
import NavigationService from '../utils/NavigationService'
import Logout from '../utils/Logout'
import { authWithToken, updateUser } from '../service'

export const login = createAction(ActionTypes.LOGIN)
export const logout = createAction(ActionTypes.LOGOUT)
export const changeNavigation = createAction(ActionTypes.CHANGE_NAVIGATION)

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
        delete user.id
        const { photoURL, uid } = data.user
        user.photoURL = photoURL
        await AsyncStorage.setItem('userToken', JSON.stringify({ token, user, uid }))
        await updateUser({ uid, ...user })
        dispatch(login({ token, user, uid }))
        NavigationService.navigate('Main')
      }
      return Promise.resolve()
    } catch (error) {
      console.warn('Error on Facebook Login', error)
      return Promise.reject()
    }
  }
}

export function makeLogout() {
  return Logout
}
