import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import TrophyScreen from '../screens/TrophyScreen'
import InfoScreen from '../screens/InfoScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={`ios-home${focused ? '' : '-outline'}`} />
  ),
}

const TrophyStack = createStackNavigator({
  Trophy: TrophyScreen,
})

TrophyStack.navigationOptions = {
  tabBarLabel: 'Trophies',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={`ios-trophy${focused ? '' : '-outline'}`} />
  ),
}

const InfoStack = createStackNavigator({
  Info: InfoScreen,
})

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={`ios-information-circle${focused ? '' : '-outline'}`} />
  ),
}

export default createBottomTabNavigator({
  HomeStack,
  TrophyStack,
  InfoStack,
})
