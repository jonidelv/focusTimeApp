import React, { PureComponent } from 'react'
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Constants, WebBrowser } from 'expo'
import HeaderLeft from '../components/HeaderLeft'
import HeaderRight from '../components/HeaderRight'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as allActions from '../actions'

class InfoScreen extends PureComponent {
  static propTypes = {
    makeLogout: PropTypes.func.isRequired,
    changeNavigation: PropTypes.func.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Info',
    headerTitleStyle: { textAlign: 'center', fontWeight: '400', flex: 1 },
    headerLeft: Platform.OS === 'ios' ? null : <HeaderLeft onPress={navigation.toggleDrawer} />,
    headerRight: <HeaderRight onPress={() => navigation.navigate('Settings')} />,
  })

  componentDidMount() {
    this.props.changeNavigation('Info')
  }

  render() {
    const { manifest } = Constants
    const sections = [
      { data: [{ value: manifest.version }], title: 'Version' },
      { data: [{ value: 'jonidelv' }], title: 'Author' },
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
        {item.value === 'jonidelv' ? (
          <Text onPress={this._handleLinkPress('https://jonidelv.me/')} style={styles.helpLinkText}>
            {item.value}
          </Text>
        ) : (
          <Text style={styles.sectionContentText}>{item.value}</Text>
        )}
      </SectionContent>
    )
  }

  _handleLinkPress = link => () => {
    WebBrowser.openBrowserAsync(link)
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
      <TouchableOpacity onPress={makeLogout}>
        <View style={styles.logoutButtonContainer}>
          <Text style={styles.logoutButton}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

mapDispatchToProps = dispatch => {
  const { makeLogout, changeNavigation } = bindActionCreators(allActions, dispatch)
  return {
    makeLogout,
    changeNavigation,
  }
}

export default connect(null, mapDispatchToProps)(InfoScreen)

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
    backgroundColor: Colors.tabBackground,
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 17,
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
    marginTop: 2,
    color: '#4d4d4d',
  },
  footerContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpLinkText: {
    color: '#2e78b7',
  },
  logoutButtonContainer: {
    height: 45,
    width: 220,
    borderRadius: 19,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
  logoutButton: {
    color: Colors.white,
    fontSize: 18,
    lineHeight: 40,
  },
})
