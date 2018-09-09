import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import AndroidMenu from '../components/AndroidMenu'
import HomeScreen from '../screens/HomeScreen'
import TrophyScreen from '../screens/TrophyScreen'
import InfoScreen from '../screens/InfoScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
}

const TrophyStack = createStackNavigator({
  Trophy: TrophyScreen,
})

TrophyStack.navigationOptions = {
  tabBarLabel: 'Trophies',
}

const InfoStack = createStackNavigator({
  Info: InfoScreen,
})

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
}

export default createDrawerNavigator(
  {
    HomeStack,
    TrophyStack,
    InfoStack,
  },
  {
    contentComponent: AndroidMenu,
    drawerWidth: 300,
  }
)
