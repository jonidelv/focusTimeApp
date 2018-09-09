import React, { PureComponent } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import PropTypes from 'prop-types'

class TabBarIcon extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    focused: PropTypes.bool,
  }

  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={this.props.size ? this.props.size : 26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.blue : Colors.tabIconDefault}
      />
    )
  }
}

export default TabBarIcon
