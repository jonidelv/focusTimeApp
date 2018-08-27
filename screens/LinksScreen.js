import React from 'react'
import { ExpoLinksView } from '@expo/samples'
import TabBarIcon from '../components/TabBarIcon'
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

export default class LinksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Links',
    headerLeft:
      Platform.OS === 'ios' ? null : (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <TabBarIcon name={'md-information-circle'} />
        </TouchableOpacity>
      ),
  })

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
