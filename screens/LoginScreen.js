import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Button,
  Alert
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  login = async () => {
    // TODO: do the actual login
    try {
      const {
        type,
        token
      } = await Expo.Facebook.logInWithReadPermissionsAsync('590588907994139', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        console.log('token', token)
        await AsyncStorage.setItem('userToken', token);
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert(
          'Logged in!',
          `Hi ${(await response.json()).name}!`,
        );
        this.props.navigation.navigate('Main');
      }
    } catch (error) {
      // Error saving data
      console.log('error', error)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.loginButtonContainer}>
            <Button 
              buttonStyle={styles.loginButton}
              onPress={this.login}
              color="blue"
              title='Facebook Login' />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  headerImage: {
    resizeMode: 'contain',
  },
  loginButtonContainer: {
    marginTop: 50,
  },
  loginButton: {
    backgroundColor: '#88ec51',
    width: 200,
    borderRadius: 5,
  }
});
