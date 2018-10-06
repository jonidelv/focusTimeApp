import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

function ProgressBar(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={{ flex: props.progress }} />
      <View
        style={{ flex: 1 - props.progress, backgroundColor: props.incompleteBackgroundColor }}
      />
    </View>
  )
}

ProgressBar.defaultProps = {
  style: {},
  incompleteBackgroundColor: '#fff',
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  incompleteBackgroundColor: PropTypes.string.isRequired,
}

export default ProgressBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: Colors.blue,
  },
})
