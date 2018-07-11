import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createStackNavigator } from 'react-navigation';
import Pages from './pages/pages'


const RootStack = createStackNavigator(
    Pages,
    {
        initialRouteName: 'Home', 
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#638df2',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:22
            },
        },
    }
);
class App extends React.Component {
    render() {
      return <RootStack/>;
    }
  }



AppRegistry.registerComponent(appName, () => App);
