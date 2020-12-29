import React, { useState } from "react";
import { Alert } from "react-native";
import { View, Button, Text, TextInput, TouchableOpacity } from "react-native";
import firebase from "../database/firebase";

function LogInScreen(props) {
    const [LoginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });
    console.log(LoginUser);

    const handleLogin = async () => {
        await firebase.auth
            .signInWithEmailAndPassword(LoginUser.email, LoginUser.password)
            .then(() => props.navigation.navigate("Home"))
            .catch((error) => {
                Alert.alert("Error:", "Email or password might be wrong");
                console.log(error);
            });
    };

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 34,
                    fontWeight: "bold",
                    color: "#0B73F8",
                    marginBottom: 30,
                }}>
                Login
            </Text>
            <View
                style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    width: 250,
                }}>
                <View
                    style={{
                        padding: 5,
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: "#cccccc",
                        color: "#000",
                    }}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={(value) =>
                            setLoginUser({ ...LoginUser, email: value })
                        }></TextInput>
                </View>
                <View
                    style={{
                        padding: 5,
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: "#cccccc",
                        color: "#000",
                    }}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={(value) =>
                            setLoginUser({ ...LoginUser, password: value })
                        }></TextInput>
                </View>
                <View
                    style={{
                        padding: 5,
                        marginTop: 25,
                        color: "#000",
                    }}>
                    <Button
                        title="Login"
                        onPress={() => handleLogin()}></Button>
                </View>
                <View
                    style={{
                        marginTop: 25,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignSelf: "center",
                    }}>
                    <Text>Don't have an acount yet?</Text>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: 70,
                        }}
                        onPress={() => {
                            props.navigation.navigate("Sign up");
                        }}>
                        <Text style={{ fontWeight: "bold", color: "blue" }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default LogInScreen;
