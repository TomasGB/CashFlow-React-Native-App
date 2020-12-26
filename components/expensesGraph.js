import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";

function ExpenseGraph() {
    const [Expense, setExpense] = useState(0);
    const [billsExpense, setBillsExpense] = useState(0);
    const [foodExpense, setFoodExpense] = useState(0);
    const [carExpense, setCarExpense] = useState(0);
    const [otherExpense, setOtherExpense] = useState(0);

    useEffect(() => {
        firebase.db
            .collection("transactions")
            .orderBy("dateId", "desc")
            .onSnapshot((querySnapshot) => {
                let acumExpense = 0;
                let billsExpenseAcum = 0;
                let foodExpenseAcum = 0;
                let carExpenseAcum = 0;
                let otherExpenseAcum = 0;

                querySnapshot.docs.forEach((doc) => {
                    if (
                        (doc.data().Type == "expense") |
                        (doc.data().Type == "Expense")
                    ) {
                        acumExpense =
                            acumExpense + parseFloat(doc.data().Amount);

                        if (doc.data().Category == "Bills") {
                            billsExpenseAcum =
                                billsExpenseAcum +
                                parseFloat(doc.data().Amount);
                        } else if (doc.data().Category == "Food") {
                            foodExpenseAcum =
                                foodExpenseAcum + parseFloat(doc.data().Amount);
                        } else if (doc.data().Category == "Car expenses") {
                            carExpenseAcum =
                                carExpenseAcum + parseFloat(doc.data().Amount);
                        } else {
                            otherExpenseAcum =
                                otherExpenseAcum +
                                parseFloat(doc.data().Amount);
                        }
                    }
                });
                setExpense(acumExpense);
                setBillsExpense(billsExpenseAcum);
                setFoodExpense(foodExpenseAcum);
                setCarExpense(carExpenseAcum);
                setOtherExpense(otherExpenseAcum);
            });
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: "flex-start", margin: 10 }}>
            <View
                style={{
                    backgroundColor: "rgba(189, 249, 253, 0.12)",
                    padding: 5,
                    borderRadius: 5,
                    padding: 15,
                }}>
                <View
                    style={{
                        alignSelf: "flex-start",
                        marginVertical: 5,
                        color: "#ffffff",
                    }}>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#000000",
                            fontSize: 20,
                            fontWeight: "700",
                            marginBottom: 5,
                        }}>
                        Expenses
                    </Text>
                    <View
                        style={{
                            alignSelf: "flex-start",
                            color: "#000000",
                            flexDirection: "row",
                        }}>
                        <Ionicons
                            name="document-text-outline"
                            size={20}></Ionicons>
                        <Text
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                fontSize: 16,
                                fontWeight: "700",
                                marginLeft: 5,
                            }}>
                            Bills
                        </Text>
                    </View>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        {((billsExpense * 100) / Expense).toFixed(2)} %
                    </Text>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        ${billsExpense.toFixed(2)}
                    </Text>
                </View>
                <View
                    style={{
                        alignSelf: "flex-start",
                        color: "#ffffff",
                        marginVertical: 5,
                    }}>
                    <View
                        style={{
                            alignSelf: "flex-start",
                            color: "#000000",
                            flexDirection: "row",
                        }}>
                        <Ionicons name="fast-food-outline" size={20}></Ionicons>
                        <Text
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                fontSize: 16,
                                fontWeight: "700",
                                marginLeft: 5,
                            }}>
                            Food
                        </Text>
                    </View>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        {((foodExpense * 100) / Expense).toFixed(2)} %
                    </Text>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        ${foodExpense.toFixed(2)}
                    </Text>
                </View>
                <View
                    style={{
                        alignSelf: "flex-start",
                        color: "#ffffff",
                        marginVertical: 5,
                    }}>
                    <View
                        style={{
                            alignSelf: "flex-start",
                            color: "#000000",
                            flexDirection: "row",
                        }}>
                        <Ionicons name="car-outline" size={20}></Ionicons>
                        <Text
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                fontSize: 16,
                                fontWeight: "700",
                                marginLeft: 5,
                            }}>
                            Car
                        </Text>
                    </View>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        {((carExpense * 100) / Expense).toFixed(2)} %
                    </Text>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        ${carExpense.toFixed(2)}
                    </Text>
                </View>
                <View
                    style={{
                        alignSelf: "flex-start",
                        color: "#ffffff",
                        marginVertical: 5,
                    }}>
                    <View
                        style={{
                            alignSelf: "flex-start",
                            color: "#000000",
                            flexDirection: "row",
                        }}>
                        <Ionicons name="question" size={20}></Ionicons>
                        <Text
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                fontSize: 16,
                                fontWeight: "700",
                                marginLeft: 5,
                            }}>
                            Others
                        </Text>
                    </View>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        {((otherExpense * 100) / Expense).toFixed(2)} %
                    </Text>
                    <Text
                        style={{
                            alignSelf: "flex-start",
                            color: "#ffffff",
                            marginVertical: 2,
                        }}>
                        ${otherExpense.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default ExpenseGraph;
