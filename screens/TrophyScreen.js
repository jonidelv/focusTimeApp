import React from 'react'
import { ExpoLinksView } from '@expo/samples'
import HeaderLeft from '../components/HeaderLeft'
import HeaderRight from '../components/HeaderRight'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

class TrophyScreen extends React.Component {
  static propTypes = {
    changeNavigation: PropTypes.func.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Trophies',
    headerTitleStyle: { textAlign: 'center', fontWeight: '400', flex: 1 },
    headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
    headerRight: <HeaderRight onPress={() => console.log('Header Right Pressed')} />,
  })

  componentDidMount() {
    this.props.changeNavigation('Trophy')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    )
  }
}

mapDispatchToProps = dispatch => {
  const { changeNavigation } = bindActionCreators(allActions, dispatch)
  return {
    changeNavigation,
  }
}

export default connect(null, mapDispatchToProps)(TrophyScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
