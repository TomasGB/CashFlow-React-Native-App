import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import AddTransactionScreen from './screens/addTransaction';
import { Buffer } from 'buffer';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

global.Buffer = Buffer;


const Stack = createStackNavigator()

function MyStack() {
  return(
    <Stack.Navigator> 
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="addTransaction" component={AddTransactionScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#266BD1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});