import NavigationService from '../utils/NavigationService'
import { AsyncStorage } from 'react-native'
import { logout } from '../service'
import Toast from 'react-native-root-toast'

export default async function Logout() {
  try {
    await AsyncStorage.removeItem('userToken')
    logout()
  } catch (error) {
    console.warn(error)
    Toast.show('Error, please try again later', {
      position: 0,
      backgroundColor: '#d50001',
    })
  } finally {
    NavigationService.navigate('Auth')
  }
}
