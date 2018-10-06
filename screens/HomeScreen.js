import React from 'react'
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

/*
  +1 pt for every minute
  -5 pts on restart
  -5 pts for pausing
  +5 pts for finishing
*/

class HomeScreen extends React.Component {
  state = {
    timer: this.props.timerDuration,
    rest: this.props.restDuration,
    activeCountdown: 'timer',
    countdownRunning: false,
  }

  static defaultProps = {
    score: 0,
  }

  static propTypes = {
    changeNavigation: PropTypes.func.isRequired,
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
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

  componentWillReceiveProps(nextProps) {
    if (this.props.timerDuration !== nextProps.timerDuration) {
      this.setState({
        timer: nextProps.timerDuration,
      })
    }
    if (this.props.restDuration !== nextProps.restDuration) {
      this.setState({
        rest: nextProps.restDuration,
      })
    }
  }

  handleToggleCountdown = () => {
    if (this.state.countdownRunning) {
      this.setState({ countdownRunning: false })
      this.props.decrementAndHandleScore(5)
      return window.clearInterval(this.interval)
    }

    this.setState({
      countdownRunning: true,
    })

    this.interval = setInterval(() => {
      const activeCountdown = this.state.activeCountdown
      const nextSecond = this.state[activeCountdown] - 1

      if (nextSecond === 0) {
        this.setState({
          [activeCountdown]:
            activeCountdown === 'timer' ? this.props.timerDuration : this.props.restDuration,
          activeCountdown: activeCountdown === 'timer' ? 'rest' : 'timer',
        })
        this.props.incrementAndHandleScore(5)
      } else {
        this.setState({
          [activeCountdown]: nextSecond,
        })
      }

      if (nextSecond % 60 === 0) {
        this.props.incrementAndHandleScore(1)
      }
    }, 1000)
  }

  handleReset = () => {
    window.clearInterval(this.interval)
    this.setState({
      timer: this.props.timerDuration,
      countdownRunning: false,
    })
    this.props.decrementAndHandleScore(5)
  }

  handleSkipRest = () => {
    this.setState({
      rest: this.props.restDuration,
      activeCountdown: 'timer',
    })
  }

  getProgress = () => {
    return this.state.activeCountdown === 'timer'
      ? 1 - this.state.timer / this.props.timerDuration
      : 1 - this.state.rest / this.props.restDuration
  }

  render() {
    const progressBarStyles = {
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: this.state.activeCountdown === 'timer' ? Colors.blue : Colors.red,
    }
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.state.activeCountdown === 'timer' ? Colors.blue : Colors.red },
        ]}>
        <Text style={styles.score}>Score: {this.props.score}</Text>
        <Text style={styles.countdown}>{secondsToHMS(this.state[this.state.activeCountdown])}</Text>
        <ProgressBar progress={this.getProgress()} style={progressBarStyles} />
        <View style={styles.footer}>
          {this.state.activeCountdown === 'timer' ? (
            <View style={styles.timerButtons}>
              {this.state.countdownRunning ? (
                <PressableIcon name="ios-pause-outline" onPress={this.handleToggleCountdown} />
              ) : (
                <PressableIcon name="ios-play-outline" onPress={this.handleToggleCountdown} />
              )}
              <PressableIcon name="ios-refresh-outline" onPress={this.handleReset} />
            </View>
          ) : (
            <TouchableOpacity onPress={this.handleSkipRest}>
              <Text style={styles.skipText}>Skip Rest</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

function mapStateToProps({ settings, scores, user }) {
  return {
    timerDuration: settings.timerDuration * 60,
    restDuration: settings.restDuration * 60,
    score: scores.usersScores[user.uid],
  }
}

mapDispatchToProps = dispatch => {
  const { changeNavigation, incrementAndHandleScore, decrementAndHandleScore } = bindActionCreators(
    allActions,
    dispatch
  )
  return {
    changeNavigation,
    incrementAndHandleScore,
    decrementAndHandleScore,
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
