import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import firebase from "../database/firebase";

function Balance() {
    const [balance, setBalance] = useState(0);
    const [totIncome, setTotIncome] = useState(0);
    const [totExpense, setTotExpense] = useState(0);

    useEffect(() => {
        firebase.db
            .collection("transactions")
            .orderBy("dateId", "desc")
            .onSnapshot((querySnapshot) => {
                let acumIncome = 0;
                let acumExpenses = 0;
                querySnapshot.docs.forEach((doc) => {
                    if (
                        (doc.data().Type == "expense") |
                        (doc.data().Type == "Expense")
                    ) {
                        acumExpenses =
                            acumExpenses + parseFloat(doc.data().Amount);
                    } else {
                        acumIncome = acumIncome + parseFloat(doc.data().Amount);
                    }
                    let finalBal = acumIncome - acumExpenses;

                    setBalance(finalBal);
                });

                setTotIncome(acumIncome);
                setTotExpense(acumExpenses);
            });
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 15 }}>
            <View style={{}}>
                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 5,
                        marginBottom: 5,
                        fontSize: 16,
                        color: "grey",
                    }}>
                    Your Balance
                </Text>
                <Text style={{ fontSize: 30, textAlign: "center" }}>
                    {balance}
                </Text>
            </View>
            <View style={{ marginVertical: 20, flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: 16,
                                marginHorizontal: 15,
                                color: "grey",
                            }}>
                            Income
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "green",
                            }}>{`+ ${totIncome}`}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: 16,
                                marginHorizontal: 15,
                                color: "grey",
                            }}>
                            Expenses
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "red",
                            }}>{`- ${totExpense}`}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default Balance;
