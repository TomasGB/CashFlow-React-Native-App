import React from "react";
import { StyleSheet, SafeAreaView, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

const SplashScreen = (props) => {
    setTimeout(() => {
        props.navigation.navigate("Login");
    }, 3000);

    return (
        <LinearGradient
            colors={["#0464DE", "#3277D0", "#65A8FC"]}
            style={{ width: "100%", height: "100%" }}>
            <SafeAreaView
                style={{
                    flex: 1,
                }}>
                <View
                    style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        alignContent: "center",
                        height: "95%",
                    }}>
                    <Image
                        style={Styles.logo}
                        source={require("../assets/icon2.png")}
                    />
                    <Text style={Styles.text}>Cash Flow</Text>
                </View>
                <Text style={Styles.text2}>© Tomás Gomez Bermudez 2021</Text>
            </SafeAreaView>
        </LinearGradient>
    );
};

const Styles = StyleSheet.create({
    logo: {
        marginLeft: 20,
        width: 200,
        height: 200,
    },
    text: {
        color: "#000000",
        marginTop: 25,
        fontSize: 50,
        fontWeight: "bold",
    },
    text2: {
        color: "#000000",
        fontSize: 12,
        alignSelf: "center",
    },
});

export default SplashScreen;
