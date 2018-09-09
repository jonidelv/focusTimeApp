import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import TabBarIcon from './TabBarIcon'
import PropTypes from 'prop-types'

function HeaderRight({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress()}>
        <TabBarIcon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-options`} focused />
      </TouchableOpacity>
    </View>
  )
}

HeaderRight.propTypes = {
  onPress: PropTypes.func,
}

export default HeaderRight

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
})
