import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import TabBarIcon from './TabBarIcon'
import PropTypes from 'prop-types'

function HeaderLeft({ onPress }) {
  return Platform.OS === 'ios' ? null : (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress()}>
        <TabBarIcon name={'md-menu'} focused size={29} />
      </TouchableOpacity>
    </View>
  )
}

HeaderLeft.propTypes = {
  onPress: PropTypes.func,
}

export default HeaderLeft

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
})
