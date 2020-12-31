import React, { useState } from "react";
import { Alert } from "react-native";
import { View, Button, Text, TextInput } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    updateEmail,
    updatePassword,
    updateName,
    signup,
} from "../redux/actions/user";

class Signup extends React.Component {
    handleSignUp = () => {
        try {
            this.props.signup();
            this.props.navigation.navigate("Login");
        } catch (error) {
            Alert.alert(error);
            console.log(error);
        }
    };

    render() {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    marginTop: 170,
                }}>
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
                    <TextInput
                        style={{
                            padding: 5,
                            marginBottom: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: "#cccccc",
                            color: "#000",
                        }}
                        value={this.props.user.name}
                        onChangeText={(name) => this.props.updateName(name)}
                        placeholder="Name"
                    />
                    <TextInput
                        style={{
                            padding: 5,
                            marginBottom: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: "#cccccc",
                            color: "#000",
                        }}
                        value={this.props.user.email}
                        onChangeText={(email) => this.props.updateEmail(email)}
                        placeholder="Email"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{
                            padding: 5,
                            marginBottom: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: "#cccccc",
                            color: "#000",
                        }}
                        value={this.props.user.password}
                        onChangeText={(password) =>
                            this.props.updatePassword(password)
                        }
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <View
                        style={{
                            width: 200,
                            padding: 5,
                            marginTop: 25,
                            color: "#000",
                        }}>
                        <Button
                            title={"Sign up"}
                            onPress={this.handleSignUp}></Button>
                    </View>
                </View>
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        { updateName, updateEmail, updatePassword, signup },
        dispatch
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
