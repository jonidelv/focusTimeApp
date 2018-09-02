import React, { PureComponent } from 'react'
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Constants } from 'expo'
import Logout from '../utils/Logout'
import TabBarIcon from '../components/TabBarIcon'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

class SettingsScreen extends PureComponent {
  static propTypes = {
    makeLogout: PropTypes.func.isRequired,
  }

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
        ListFooterComponent={() => <ListFooter makeLogout={this.props.makeLogout} />}
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

const ListFooter = ({ makeLogout }) => {
  return (
    <View style={styles.footerContainer}>
      <Button onPress={makeLogout} title="Logout" />
    </View>
  )
}

mapDispatchToProps = dispatch => {
  const { makeLogout } = bindActionCreators(allActions, dispatch)
  return {
    makeLogout,
  }
}

export default connect(null, mapDispatchToProps)(SettingsScreen)

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
