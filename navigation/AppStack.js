import {
  createStackNavigator
} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

export default AppStack = createStackNavigator({
      Main: MainTabNavigator
    }, {
  navigationOptions: () => ({
    headerTitleStyle: {
      fontWeight: 'normal'
    }
  })
})
