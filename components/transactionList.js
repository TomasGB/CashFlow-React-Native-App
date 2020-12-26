import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";

function TransactionList() {
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
                        category: doc.data().Category,
                    });
                });
                setTransactions(transactions);
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 15 }}>
            <FlatList
                data={transactions}
                maxToRenderPerBatch={2}
                initialNumToRender={2}
                horizontal={true}
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
                                    fontSize: 16,
                                    color: "#000",
                                    marginBottom: 5,
                                    marginRight: 10,
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
                                fontSize: 12,
                                color: "#000000",
                                marginLeft: 5,
                            }}>
                            {"$ " + item.amount}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
        backgroundColor: "#3986F9",
    },
    transactionsView: {
        backgroundColor: "rgba(134, 216, 247 , 0.2)",
        marginVertical: 5,
        marginHorizontal: 5,
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

export default TransactionList;
