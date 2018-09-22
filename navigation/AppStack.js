import { createStackNavigator } from 'react-navigation'
import MainNavigator from './MainNavigator'
import SettingsScreen from '../screens/SettingsScreen'

export const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: SettingsScreen.navigationOptions,
  },
})

export default (AppStack = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
    },
    Settings: {
      screen: SettingsStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
))
