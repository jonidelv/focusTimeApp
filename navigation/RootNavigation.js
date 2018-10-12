import React, { PureComponent } from 'react'
import { Notifications } from 'expo'
import { createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import NavigationService from '../utils/NavigationService'
import Timer from '../components/Timer'

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync'

const RootSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default class RootNavigator extends PureComponent {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications()
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove()
  }

  render() {
    return (
      <Timer>
        <RootSwitchNavigator
          ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        />
      </Timer>
    )
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync()

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`)
  }
}
