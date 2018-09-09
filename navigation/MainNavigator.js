import { Platform } from 'react-native'
import IosNavigator from './IosNavigator'
import AndroidNavigator from './AndroidNavigator'

const Navigator = Platform.OS === 'ios' ? IosNavigator : AndroidNavigator
export default Navigator
