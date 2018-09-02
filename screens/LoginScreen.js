import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

class LoginScreen extends PureComponent {
  static propTypes = {
    makeLogin: PropTypes.func.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sloganContainer}>
          <Image style={styles.image} source={require('../assets/images/logo.png')} />
          <Text style={styles.slogan}>Focus Time</Text>
        </View>
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={this.props.makeLogin}>
            <View style={styles.loginButtonContainer}>
              <Ionicons
                name={'logo-facebook'}
                size={26}
                style={styles.facebookLogo}
                color={Colors.blue}
              />
              <Text style={styles.loginButton}>Facebook Login</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.assuranceText}>Don't worry. We don't post anything to Facebook</Text>
        </View>
      </View>
    )
  }
}

mapDispatchToProps = dispatch => {
  const { makeLogin } = bindActionCreators(allActions, dispatch)
  return {
    makeLogin,
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen)

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
    borderColor: Colors.black,
  },
  slogan: {
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
    color: Colors.blue,
    fontWeight: '300',
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  loginButtonContainer: {
    height: 45,
    width: 220,
    borderRadius: 19,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    color: Colors.blue,
    fontSize: 18,
    lineHeight: 40,
  },
  facebookLogo: {
    marginRight: 10,
  },
  assuranceText: {
    textAlign: 'center',
    color: Colors.lightGrey,
    fontSize: 15,
  },
})
