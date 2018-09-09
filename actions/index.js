import ActionTypes from '../constants/ActionTypes'
import { createAction } from 'redux-actions'
import { AsyncStorage } from 'react-native'
import Request from '../utils/Request'
import NavigationService from '../utils/NavigationService'
import Logout from '../utils/Logout'

export const login = createAction(ActionTypes.LOGIN)
export const logout = createAction(ActionTypes.LOGOUT)
export const changeNavigation = createAction(ActionTypes.CHANGE_NAVIGATION)

export function makeLogin({ user, token }) {
  return async dispatch => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('590588907994139', {
        permissions: ['public_profile'],
      })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const user = await Request(`https://graph.facebook.com/me?access_token=${token}`)
        await AsyncStorage.setItem('userToken', JSON.stringify({ token, user }))
        dispatch(login({ token, user }))
        NavigationService.navigate('Main')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export function makeLogout() {
  return Logout
}
