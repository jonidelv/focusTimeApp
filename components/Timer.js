import React, { Component } from 'react'
import appContext from '../utils/appContext'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

const { Provider } = appContext
/*
  +1 pt for every minute
  -5 pts on restart
  -5 pts for pausing
  +5 pts for finishing
*/

class Timer extends Component {
  state = {
    timer: this.props.timerDuration,
    rest: this.props.restDuration,
    activeCountdown: 'timer',
    countdownRunning: false,
  }

  static propTypes = {
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
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
    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            handleToggleCountdown: this.handleToggleCountdown,
            handleReset: this.handleReset,
            handleSkipRest: this.handleSkipRest,
            getProgress: this.getProgress,
          },
        }}>
        {this.props.children}
      </Provider>
    )
  }
}

function mapStateToProps({ settings }) {
  return {
    timerDuration: settings.timerDuration * 60,
    restDuration: settings.restDuration * 60,
  }
}

mapDispatchToProps = dispatch => {
  const { incrementAndHandleScore, decrementAndHandleScore } = bindActionCreators(
    allActions,
    dispatch
  )
  return {
    incrementAndHandleScore,
    decrementAndHandleScore,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
