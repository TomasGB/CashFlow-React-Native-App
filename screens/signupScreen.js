import React, { useState } from "react";
import { Alert } from "react-native";
import { View, Button, Text, TextInput } from "react-native";
import firebase from "../database/firebase";

function SignUpScreen(props) {
    const [user, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSignUp = async () => {
        await firebase.auth
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                firebase.db.collection("users").add({
                    Name: user.name,
                    Email: user.email,
                    Password: user.password,
                });
                props.navigation.navigate("Login");
            })
            .catch((error) => {
                Alert.alert("Error", "There was an error.");
                console.log(`Error: ${error.code}`, `${error.message}`);
            });
    };

    console.log(user);

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#0B73F8",
                    marginBottom: 30,
                }}>
                Create a new account
            </Text>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <View
                    style={{
                        padding: 5,
                        marginBottom: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: "#cccccc",
                        color: "#000",
                    }}>
                    <TextInput
                        placeholder="Name"
                        onChangeText={(value) =>
                            setNewUser({ ...user, name: value })
                        }></TextInput>
                </View>
                <View
                    style={{
                        padding: 5,
                        marginBottom: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: "#cccccc",
                        color: "#000",
                    }}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={(value) =>
                            setNewUser({ ...user, email: value })
                        }></TextInput>
                </View>
                <View
                    style={{
                        padding: 5,
                        marginBottom: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: "#cccccc",
                        color: "#000",
                    }}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={(value) =>
                            setNewUser({ ...user, password: value })
                        }></TextInput>
                </View>
                <View
                    style={{
                        width: 200,
                        padding: 5,
                        marginTop: 25,
                        color: "#000",
                    }}>
                    <Button
                        title="Sign Up"
                        onPress={() => handleSignUp()}></Button>
                </View>
            </View>
        </View>
    );
}
export default SignUpScreen;
