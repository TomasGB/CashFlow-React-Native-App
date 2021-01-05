import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    updateEmail,
    updatePassword,
    login,
    getUser,
} from "../redux/actions/user";
import firebase from "../database/firebase";

class Login extends React.Component {
    handleLogin = () => {
        try {
            this.props.login();
        } catch (error) {
            Alert.alert(error);
            console.log(error);
        }
    };
    componentDidMount = () => {
        firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.getUser(user.uid);
                if (this.props.user != null) {
                    this.props.navigation.navigate("Home");
                }
            }
        });
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignSelf: "center",
                }}>
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
                <TextInput
                    style={{
                        padding: 5,
                        marginBottom: 20,
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
                        marginBottom: 20,
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
                        padding: 5,
                        marginTop: 25,
                        color: "#000",
                    }}>
                    <Button
                        title="Login"
                        onPress={() => this.handleLogin()}></Button>
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
                            this.props.navigation.navigate("Sign up");
                        }}>
                        <Text style={{ fontWeight: "bold", color: "blue" }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    inputBox: {
        width: "85%",
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: "#d3d3d3",
        borderBottomWidth: 1,
        textAlign: "center",
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: "center",
        backgroundColor: "#F6820D",
        borderColor: "#F6820D",
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    buttonSignup: {
        fontSize: 12,
    },
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        { updateEmail, updatePassword, login, getUser },
        dispatch
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
