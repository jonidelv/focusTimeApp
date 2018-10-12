import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

class LoginScreen extends PureComponent {
  state = {
    loading: false,
  }

  static propTypes = {
    makeLogin: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    changeNavigation: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    this.props.changeNavigation('Login')
    if (this.props.isLogged) {
      this.props.logout()
    }
  }

  makeLogin = async () => {
    try {
      this.setState({ loading: true })
      await this.props.makeLogin()
      this.setState({ loading: false })
    } catch (error) {
      console.warn('Error on Facebook Login', error)
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sloganContainer}>
          <Image style={styles.image} source={require('../assets/images/logo.png')} />
          <Text style={styles.slogan}>{this.state.loading ? 'Loading...' : 'Focus Time'}</Text>
          {this.state.loading && <ActivityIndicator size="small" color={Colors.blue} />}
        </View>
        {!this.state.loading && (
          <View style={styles.loginContainer}>
            <TouchableOpacity onPress={this.makeLogin}>
              <View style={styles.loginButtonContainer}>
                <Ionicons
                  name={'logo-facebook'}
                  size={26}
                  style={styles.facebookLogo}
                  color={Colors.white}
                />
                <Text style={styles.loginButton}>Facebook Login</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.assuranceText}>
              Don't worry. We don't post anything to Facebook
            </Text>
          </View>
        )}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
  }
}

mapDispatchToProps = dispatch => {
  const { makeLogin, changeNavigation, logout } = bindActionCreators(allActions, dispatch)
  return {
    makeLogin,
    changeNavigation,
    logout,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

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
    borderColor: Colors.lightBlue,
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    color: Colors.white,
    fontSize: 18,
    lineHeight: 40,
  },
  facebookLogo: {
    marginRight: 10,
  },
  assuranceText: {
    textAlign: 'center',
    color: '#afafaf',
    fontSize: 15,
  },
})
