import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/signupScreen";
import LogInScreen from "../screens/loginScreen";

const HomeScreen = (props) => {
    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LogInScreen} />
                <Stack.Screen name="Sign up" component={SignUpScreen} />
            </Stack.Navigator>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyStack />
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({});

export default HomeScreen;
