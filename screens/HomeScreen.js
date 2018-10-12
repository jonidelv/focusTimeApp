import React, { PureComponent } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderLeft from '../components/HeaderLeft'
import HeaderRight from '../components/HeaderRight'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'
import ProgressBar from '../components/ProgressBar'
import PressableIcon from '../components/PressableIcon'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

import appContext from '../utils/appContext'
const { Consumer } = appContext

function secondsToHMS(secs) {
  const hours = Math.floor(secs / 3600)
  const mins = Math.floor((secs % 3600) / 60)
  const seconds = Math.floor((secs % 3600) % 60)
  return (
    (hours > 0 ? hours + ':' + (mins < 10 ? '0' : '') : '') +
    mins +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds
  )
}

class HomeScreen extends PureComponent {
  static defaultProps = {
    score: 0,
  }

  static propTypes = {
    changeNavigation: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerTitleStyle: { textAlign: 'center', fontWeight: '400', flex: 1 },
    headerLeft: Platform.OS === 'ios' ? null : <HeaderLeft onPress={navigation.toggleDrawer} />,
    headerRight: <HeaderRight onPress={() => navigation.navigate('Settings')} />,
  })

  componentDidMount() {
    this.props.changeNavigation('Home')
  }

  render() {
    return (
      <Consumer>
        {({ state, actions }) => (
          <View
            style={[
              styles.container,
              { backgroundColor: state.activeCountdown === 'timer' ? Colors.blue : Colors.red },
            ]}>
            <Text style={styles.score}>Score: {this.props.score}</Text>
            <Text style={styles.countdown}>{secondsToHMS(state[state.activeCountdown])}</Text>
            <ProgressBar
              progress={actions.getProgress()}
              style={{
                marginRight: 20,
                marginLeft: 20,
                backgroundColor: state.activeCountdown === 'timer' ? Colors.blue : Colors.red,
              }}
            />
            <View style={styles.footer}>
              {state.activeCountdown === 'timer' ? (
                <View style={styles.timerButtons}>
                  {state.countdownRunning ? (
                    <PressableIcon
                      name="ios-pause-outline"
                      onPress={actions.handleToggleCountdown}
                    />
                  ) : (
                    <PressableIcon
                      name="ios-play-outline"
                      onPress={actions.handleToggleCountdown}
                    />
                  )}
                  <PressableIcon name="ios-refresh-outline" onPress={actions.handleReset} />
                </View>
              ) : (
                <TouchableOpacity onPress={actions.handleSkipRest}>
                  <Text style={styles.skipText}>Skip Rest</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Consumer>
    )
  }
}

function mapStateToProps({ scores, user }) {
  return {
    score: scores.usersScores[user.uid],
  }
}

mapDispatchToProps = dispatch => {
  const { changeNavigation } = bindActionCreators(allActions, dispatch)
  return {
    changeNavigation,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 65,
  },
  score: {
    margin: 10,
    alignSelf: 'stretch',
    color: Colors.white,
    fontSize: 16,
    textAlign: 'right',
  },
  countdown: {
    color: Colors.white,
    fontSize: 100,
    textAlign: 'center',
    margin: 30,
    fontWeight: '100',
  },
  timerButtons: {
    flexDirection: 'row',
  },
  skipText: {
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
})
