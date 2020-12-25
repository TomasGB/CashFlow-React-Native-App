import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const BalanceScreen = (props, navigation) => {
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
                        area: doc.data().Area,
                    });
                });
                setTransactions(transactions);
                console.log(transactions);
            });
    }, []);

    return (
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
                            Your transactions
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
                                        color: "#fff",
                                        marginLeft: 5,
                                    }}>
                                    {item.amount}
                                </Text>
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity
                    style={Styles.Btn}
                    onPress={() => props.navigation.navigate("addTransaction")}>
                    <Ionicons
                        name="add-outline"
                        style={{
                            color: "#FFFFFF",
                            fontSize: 30,
                        }}></Ionicons>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
        backgroundColor: "#3986F9",
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
        color: "red",
        transform: [{ rotateX: "180deg" }],
    },
    ArrowIncome: {
        fontSize: 16,
        alignSelf: "flex-end",
        alignItems: "center",
        color: "green",
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
