import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import RootNavigation from './navigation/RootNavigation'
import { Provider } from 'react-redux'
import store from './store'
import { firebaseAuth } from './config'
import Logout from './utils/Logout.js'

class App extends Component {
  state = {
    isLoadingComplete: false,
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      if (!user) {
        Logout()
      }
    })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <RootNavigation />
          </View>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require('./assets/images/logo.png'), require('./assets/images/icon.png')]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default App
