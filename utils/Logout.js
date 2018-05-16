import NavigationService from '../utils/NavigationService'
import { AsyncStorage } from 'react-native'

export default async function Logout() {
  try {
    await AsyncStorage.removeItem('userToken')
  } catch (error) {
    throw new Error(error)
  } finally {
    NavigationService.navigate('Auth')
  }
}
