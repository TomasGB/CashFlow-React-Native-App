import React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import AddTransactionScreen from './screens/addTransaction';
import { Buffer } from 'buffer';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true)

global.Buffer = Buffer;

const Stack = createStackNavigator()

function MyStack() {
  return(
    <Stack.Navigator> 
      <Stack.Screen name="home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="addTransaction" component={AddTransactionScreen} options={{headerShown: false}}/>
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