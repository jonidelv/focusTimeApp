import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'

function PressableIcon(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Icon name={props.name} color={Colors.white} size={60} />
    </TouchableOpacity>
  )
}

PressableIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default PressableIcon

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})
