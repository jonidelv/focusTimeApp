import NavigationService from '../utils/NavigationService'
import { AsyncStorage } from 'react-native'
import { ref, firebaseAuth } from '../config'

export default async function Logout() {
  try {
    await AsyncStorage.removeItem('userToken')
    firebaseAuth.signOuth()
    ref.off()
  } catch (error) {
    console.warn(error)
  } finally {
    NavigationService.navigate('Auth')
  }
}
