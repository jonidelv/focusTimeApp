import NavigationService from '../utils/NavigationService'
import { AsyncStorage } from 'react-native'

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  if (response.status === 401) {
    try {
      await AsyncStorage.removeItem('userToken')
    } catch (error) {
      throw new Error(error)
    } finally {
      NavigationService.navigate('Auth')
    }
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}
