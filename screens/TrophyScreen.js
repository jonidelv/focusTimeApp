import React from 'react'
import HeaderLeft from '../components/HeaderLeft'
import HeaderRight from '../components/HeaderRight'
import { StyleSheet, Platform, ListView, View, ActivityIndicator, Text } from 'react-native'
import PropTypes from 'prop-types'
import { getLeaders } from '../selectors'
import Colors from '../constants/Colors'
import Image from 'react-native-image-progress'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

imageStyles = {
  height: 60,
  width: 60,
  borderRadius: 30,
  overflow: 'hidden',
}

class TrophyScreen extends React.Component {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  state = {
    dataSource: this.ds.cloneWithRows(this.props.leaders),
  }

  static propTypes = {
    changeNavigation: PropTypes.func.isRequired,
    fetchAndSetScoresListener: PropTypes.func.isRequired,
    listenerSet: PropTypes.bool.isRequired,
    leaders: PropTypes.array.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Trophies',
    headerTitleStyle: { textAlign: 'center', fontWeight: '400', flex: 1 },
    headerLeft: Platform.OS === 'ios' ? null : <HeaderLeft onPress={navigation.toggleDrawer} />,
    headerRight: <HeaderRight onPress={() => navigation.navigate('Settings')} />,
  })

  componentDidMount() {
    this.props.changeNavigation('Trophy')
    if (!this.props.listenerSet) {
      this.props.fetchAndSetScoresListener()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leaders !== this.props.leaders) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.leaders),
      })
    }
  }

  renderRow = ({ displayName, photoURL, score }) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.userInfo}>
          <Image style={imageStyles} source={{ uri: photoURL }} />
          <Text style={styles.nameText}>{displayName}</Text>
        </View>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.props.listenerSet ? (
          <ActivityIndicator
            size="small"
            style={styles.activityIndicator}
            color={Colors.secondary}
          />
        ) : (
          <ListView renderRow={this.renderRow} dataSource={this.state.dataSource} />
        )}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    listenerSet: state.scores.listenerSet,
    leaders: getLeaders(state),
  }
}

mapDispatchToProps = dispatch => {
  const { changeNavigation, fetchAndSetScoresListener } = bindActionCreators(allActions, dispatch)
  return {
    changeNavigation,
    fetchAndSetScoresListener,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrophyScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  activityIndicator: {
    marginTop: 30,
  },
  rowContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    padding: 10,
    fontSize: 16,
    color: Colors.primary,
  },
  scoreText: {
    color: Colors.secondary,
  },
})
