import React, { PureComponent } from 'react'
import { StyleSheet, Platform, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'
import HeaderLeft from '../components/HeaderLeft'
import Slider from 'react-native-slider'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

class SettingsScreen extends PureComponent {
  state = {
    timerDuration: 20,
    restDuration: 5,
  }

  static propTypes = {
    changeNavigation: PropTypes.func.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerTitleStyle: { textAlign: 'center', fontWeight: '400', flex: 1 },
    headerLeft: (
      <HeaderLeft
        onPress={() => navigation.pop()}
        icon={`${Platform.OS === 'ios' ? 'ios' : 'md'}-close`}
        size={Platform.OS === 'ios' ? 40 : undefined}
      />
    ),
    headerRight: <View style={{ width: 20 }} />,
  })

  componentDidMount() {
    this.props.changeNavigation('Settings')
  }

  handleTimerChange = timerDuration => {
    this.setState({ timerDuration })
  }

  handleRestChange = restDuration => {
    this.setState({ restDuration })
  }

  handleTimerComplete = () => {
    console.log('Finished Sliding Timer')
  }

  handleRestComplete = () => {
    console.log('Finished Sliding Rest Timer')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <Text style={styles.titleText}>Timer Duration</Text>
          <Text style={styles.valueText}>{this.state.timerDuration}</Text>
          <Text style={styles.minutes}>
            {this.state.timerDuration === 1 ? 'Minute' : 'Minutes'}
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={60}
            onSlidingComplete={this.handleTimerComplete}
            thumbTintColor={Colors.border}
            step={1}
            minimumTrackTintColor={Colors.blue}
            value={this.state.timerDuration}
            onValueChange={this.handleTimerChange}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.titleText}>Rest Duration</Text>
          <Text style={styles.valueText}>{this.state.restDuration}</Text>
          <Text style={styles.minutes}>{this.state.restDuration === 1 ? 'Minute' : 'Minutes'}</Text>
          <Slider
            minimumValue={1}
            maximumValue={60}
            onSlidingComplete={this.handleRestComplete}
            thumbTintColor={Colors.border}
            step={1}
            minimumTrackTintColor={Colors.blue}
            value={this.state.restDuration}
            onValueChange={this.handleRestChange}
          />
        </View>
        <View style={styles.space} />
      </View>
    )
  }
}

mapDispatchToProps = dispatch => {
  const { changeNavigation } = bindActionCreators(allActions, dispatch)

  return {
    changeNavigation,
  }
}

export default connect(null, mapDispatchToProps)(SettingsScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  sliderContainer: {
    flex: 2,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  space: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    color: Colors.primary,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 50,
    color: Colors.blue,
    textAlign: 'center',
    padding: 15,
  },
  minutes: {
    color: Colors.secondary,
    textAlign: 'center',
  },
})
