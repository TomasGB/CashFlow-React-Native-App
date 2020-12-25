import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function StatisticsScreen(props) {
    return (
        <SafeAreaView style={Styles.Container}>
            <ScrollView>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 15,
                            marginBottom: 5,
                        }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "flex-start",
                                paddingLeft: 5,
                                marginLeft: 10,
                            }}
                            onPress={() => props.navigation.navigate("Home")}>
                            <Ionicons
                                name="arrow-back"
                                color="#fff"
                                size={20}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 22,
                                justifyContent: "center",
                                alignSelf: "center",
                                color: "#fff",
                                marginLeft: 10,
                            }}>
                            Analytics
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
        backgroundColor: "#3986F9",
    },
});

export default StatisticsScreen;
