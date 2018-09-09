import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import SideMenuHeader from './SideMenuHeader'
import Colors from '../constants/Colors'

class SideMenu extends PureComponent {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    })
    this.props.navigation.dispatch(navigateAction)
  }

  isActive = screen => {
    return this.props.activeItemKey.includes(screen)
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <SideMenuHeader />
          <TouchableOpacity onPress={this.navigateToScreen('Home')} style={styles.navTab}>
            <Ionicons
              name={`ios-home${this.isActive('Home') ? '' : '-outline'}`}
              size={32}
              color={this.isActive('Home') ? Colors.blue : Colors.tabIconDefault}
            />
            <Text
              style={[
                { color: this.isActive('Home') ? Colors.blue : '#afafaf' },
                styles.navItemText,
              ]}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Trophy')} style={styles.navTab}>
            <Ionicons
              name={`ios-trophy${this.isActive('Trophy') ? '' : '-outline'}`}
              size={32}
              color={this.isActive('Trophy') ? Colors.blue : Colors.tabIconDefault}
            />
            <Text
              style={[
                { color: this.isActive('Trophy') ? Colors.blue : '#afafaf' },
                styles.navItemText,
              ]}>
              Trophies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Info')} style={styles.navTab}>
            <Ionicons
              name={`ios-information-circle${this.isActive('Info') ? '' : '-outline'}`}
              size={32}
              color={this.isActive('Info') ? Colors.blue : Colors.tabIconDefault}
            />
            <Text
              style={[
                { color: this.isActive('Info') ? Colors.blue : '#afafaf' },
                styles.navItemText,
              ]}>
              Info
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
}

export default SideMenu

const styles = StyleSheet.create({
  container: {},
  navTab: {
    margin: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemText: {
    marginLeft: 15,
    fontSize: 19,
    fontWeight: '400',
  },
})
