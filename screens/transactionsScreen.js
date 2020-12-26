import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../database/firebase";

const BalanceScreen = (props) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase.db
            .collection("transactions")
            .orderBy("dateId", "desc")
            .onSnapshot((querySnapshot) => {
                const transactions = [];

                querySnapshot.docs.forEach((doc) => {
                    transactions.push({
                        id: doc.id,
                        description: doc.data().Description,
                        amount: doc.data().Amount,
                        type: doc.data().Type,
                        dateId: doc.data().dateId,
                        dateString: doc.data().DateString,
                        category: doc.data().Category,
                    });
                });
                setTransactions(transactions);
            });
    }, []);

    return (
        <LinearGradient
            colors={["#0464DE", "#3277D0", "#65A8FC"]}
            style={{ width: "100%", height: "100%" }}>
            <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
                <View style={Styles.Container}>
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
                                Your transactions history
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            maxHeight: 400,
                            marginVertical: 25,
                            marginHorizontal: 20,
                        }}>
                        <FlatList
                            data={transactions}
                            initialNumToRender={3}
                            maxToRenderPerBatch={2}
                            renderItem={({ item }) => (
                                <View style={Styles.transactionsView}>
                                    <View
                                        style={{
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                        }}>
                                        <Text
                                            style={{
                                                alignSelf: "flex-start",
                                                fontSize: 20,
                                                color: "#000",
                                                marginBottom: 5,
                                                marginVertical: 5,
                                            }}>
                                            {item.description}
                                        </Text>
                                        <Ionicons
                                            name="triangle-sharp"
                                            style={[
                                                item.type == "Expense"
                                                    ? Styles.ArrowExpense
                                                    : Styles.ArrowIncome,
                                            ]}></Ionicons>
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "rgba(255, 255, 255, 0.5)",
                                            marginLeft: 5,
                                            marginVertical: 5,
                                        }}>
                                        {item.category}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "rgba(255, 255, 255, 0.5)",
                                            marginLeft: 5,
                                            marginVertical: 5,
                                        }}>
                                        {"$" + item.amount}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "rgba(255, 255, 255, 0.5)",
                                            marginLeft: 5,
                                            marginVertical: 5,
                                        }}>
                                        {item.dateString}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={Styles.Btn}
                        onPress={() =>
                            props.navigation.navigate("addTransaction")
                        }>
                        <Ionicons
                            name="add-outline"
                            style={{
                                color: "#FFFFFF",
                                fontSize: 30,
                            }}></Ionicons>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
    },
    transactionsView: {
        backgroundColor: "rgba(134, 216, 247 , 0.2)",
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000",
    },
    ArrowExpense: {
        fontSize: 16,
        alignSelf: "flex-end",
        alignItems: "center",
        color: "#D12820",
        transform: [{ rotateX: "180deg" }],
    },
    ArrowIncome: {
        fontSize: 16,
        alignSelf: "flex-end",
        alignItems: "center",
        color: "#2B9B2A",
    },
    Btn: {
        backgroundColor: "rgba(134, 216, 247 , 0.5)",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "40%",
        padding: 15,
        width: 65,
        borderColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 100,
        marginBottom: 15,
    },
});

export default BalanceScreen;
