import { createStackNavigator } from 'react-navigation'
import MainNavigator from './MainNavigator'

export default (AppStack = createStackNavigator(
  {
    Main: MainNavigator,
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
        color: 'red',
      },
    }),
  }
))
