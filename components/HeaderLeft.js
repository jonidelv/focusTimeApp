import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import TabBarIcon from './TabBarIcon'
import PropTypes from 'prop-types'

function HeaderLeft({ onPress, icon, size }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress()}>
        <TabBarIcon name={icon ? icon : 'md-menu'} focused size={size ? size : 29} />
      </TouchableOpacity>
    </View>
  )
}

HeaderLeft.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.number,
}

export default HeaderLeft

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
})
