import React, { PureComponent } from 'react'
import { ActivityIndicator, AsyncStorage, StyleSheet, View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { SafeAreaView } from 'react-navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

class AuthLoadingScreen extends PureComponent {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    addTimerDuration: PropTypes.func.isRequired,
    addRestDuration: PropTypes.func.isRequired,
    fetchAndHandleScore: PropTypes.func.isRequired,
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken) {
      const data = JSON.parse(userToken)
      const { token, user, uid, settings } = data
      this.props.login({ token, user, uid })
      this.props.addTimerDuration(settings.timerDuration)
      this.props.addRestDuration(settings.restDuration)
      await this.props.fetchAndHandleScore(uid)
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.sloganContainer}>
          <Image style={styles.image} source={require('../assets/images/logo.png')} />
          <Text style={styles.slogan}>Loading</Text>
          <ActivityIndicator size="small" color={Colors.blue} />
        </View>
      </SafeAreaView>
    )
  }
}

mapDispatchToProps = dispatch => {
  const { login, addTimerDuration, addRestDuration, fetchAndHandleScore } = bindActionCreators(
    allActions,
    dispatch
  )
  return {
    login,
    addTimerDuration,
    addRestDuration,
    fetchAndHandleScore,
  }
}

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  sloganContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 50,
    height: Layout.window.height * 0.3 > 300 ? 300 : Layout.window.height * 0.3,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
  },
  slogan: {
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
    color: Colors.blue,
    fontWeight: '200',
  },
})
