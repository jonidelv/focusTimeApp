import React, { PureComponent } from 'react'
import Colors from '../constants/Colors'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Image from 'react-native-image-progress'

const imageStyles = {
  height: 60,
  width: 60,
  borderRadius: 30,
  overflow: 'hidden',
}

class SideMenuHeader extends PureComponent {
  static propTypes = {
    photoURL: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={imageStyles} source={{ uri: this.props.photoURL }} />
        <Text style={styles.nameText}>{this.props.displayName}</Text>
        <Text style={styles.scoreText}>Score: {this.props.score}</Text>
      </View>
    )
  }
}

function mapStateToProps({ user, scores }) {
  return {
    photoURL: user.user.photoURL,
    displayName: user.user.displayName,
    score: scores.usersScores[user.uid],
  }
}

export default connect(mapStateToProps)(SideMenuHeader)

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignItems: 'center',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  nameText: {
    fontSize: 20,
    color: Colors.primary,
    marginTop: 8,
    marginBottom: 3,
  },
  scoreText: {
    fontSize: 16,
    color: Colors.secondary,
  },
})
