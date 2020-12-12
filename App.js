import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import AddTransactionScreen from './screens/addTransaction';


const Stack = createStackNavigator()

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
