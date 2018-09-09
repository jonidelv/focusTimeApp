import React, { PureComponent } from 'react'
import Colors from '../constants/Colors'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

class SideMenuHeader extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <View>
        <Text>Hi I'm header</Text>
      </View>
    )
  }
}

export default SideMenuHeader

const styles = StyleSheet.create({
  container: {},
  sectionHeadingStyle: {},
  navSectionStyle: {},
  navItemStyle: {},
  footerContainer: {},
})
