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
import { LinearGradient } from "expo-linear-gradient";
import IncomeGraph from "../components/incomeGraph";
import ExpenseGraph from "../components/expensesGraph";

function AnalyticsScreen(props) {
    return (
        <LinearGradient
            colors={["#0B73F8", "#3277D0", "#65A8FC"]}
            style={{ width: "100%", height: "100%" }}>
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
                                onPress={() =>
                                    props.navigation.navigate("Home")
                                }>
                                <Ionicons
                                    name="arrow-back"
                                    color="#fff"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 20,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    color: "#fff",
                                    marginLeft: 10,
                                }}>
                                Analytics
                            </Text>
                        </View>
                        <IncomeGraph></IncomeGraph>
                        <ExpenseGraph></ExpenseGraph>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
        backgroundColor: "transparent",
    },
});

export default AnalyticsScreen;
