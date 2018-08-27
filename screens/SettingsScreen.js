import React from 'react'
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Constants } from 'expo'
import Logout from '../utils/Logout'
import TabBarIcon from '../components/TabBarIcon'

// I almost copied and pasted this code from Expo's example.
// I don't like it. But it was the fastest way to do this.

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerLeft:
      Platform.OS === 'ios' ? null : (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <TabBarIcon name={'md-information-circle'} />
        </TouchableOpacity>
      ),
  })

  render() {
    const { manifest } = Constants
    const sections = [
      { data: [{ value: manifest.sdkVersion }], title: 'sdkVersion' },
      { data: [{ value: manifest.version }], title: 'version' },
    ]

    return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={() => <ListFooter navigation={this.props.navigation} />}
        sections={sections}
      />
    )
  }

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />
  }

  _renderItem = ({ item }) => {
    return (
      <SectionContent>
        <Text style={styles.sectionContentText}>{item.value}</Text>
      </SectionContent>
    )
  }
}

const ListHeader = () => {
  const { manifest } = Constants

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl={manifest.iconUrl} />
      </View>

      <View style={styles.titleTextContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {manifest.name}
        </Text>

        <Text style={styles.descriptionText}>{manifest.description}</Text>
      </View>
    </View>
  )
}

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  )
}

const SectionContent = props => {
  return <View style={styles.sectionContentContainer}>{props.children}</View>
}

const AppIconPreview = ({ iconUrl }) => {
  return <Image source={{ uri: iconUrl }} style={{ width: 64, height: 64 }} resizeMode="cover" />
}

const ListFooter = ({ navigation }) => {
  const logOut = () => {
    Logout()
  }

  return (
    <View style={styles.footerContainer}>
      <Button onPress={logOut} title="Log Out" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleTextContainer: {
    flex: 1,
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  descriptionText: {
    flex: 1,
    flexWrap: 'wrap',
    width: '100%',
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d',
  },
  footerContainer: {
    marginTop: 20,
  },
})
