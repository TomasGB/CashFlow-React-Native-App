import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import ExpensesPieChart from "./expensesPieChart";

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
                    backgroundColor: "rgba(255,255,255 , 0.3)",
                    padding: 5,
                    borderRadius: 5,
                    padding: 15,
                }}>
                <Text style={Styles.ExpensesTitle}>Expenses</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <View style={Styles.Category}>
                        <View
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <Ionicons
                                name="document-text-outline"
                                size={20}></Ionicons>
                            <Text style={Styles.TitleText}>Bills</Text>
                        </View>
                        <Text style={Styles.Text}>
                            $ {billsExpense.toFixed(2)}
                        </Text>
                    </View>
                    <View style={Styles.Category}>
                        <View
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <Ionicons
                                name="fast-food-outline"
                                size={20}></Ionicons>
                            <Text style={Styles.TitleText}>Food</Text>
                        </View>
                        <Text style={Styles.Text}>
                            $ {foodExpense.toFixed(2)}
                        </Text>
                    </View>
                    <View style={Styles.Category}>
                        <View
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <Ionicons name="car-outline" size={20}></Ionicons>
                            <Text style={Styles.TitleText}>Car</Text>
                        </View>
                        <Text style={Styles.Text}>
                            $ {carExpense.toFixed(2)}
                        </Text>
                    </View>
                    <View style={Styles.Category}>
                        <View
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <Ionicons name="question" size={20}></Ionicons>
                            <Text style={Styles.TitleText}>Others</Text>
                        </View>
                        <Text style={Styles.Text}>
                            $ {otherExpense.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <ExpensesPieChart />
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    TitleText: {
        alignSelf: "flex-start",
        color: "#000000",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 5,
    },
    Text: {
        alignSelf: "center",
        color: "#ffffff",
        marginVertical: 2,
    },
    ExpensesTitle: {
        alignSelf: "flex-start",
        color: "#000000",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
    },
    Category: {
        alignSelf: "flex-start",
        color: "#ffffff",
        marginVertical: 5,
        marginRight: 15,
    },
});
export default ExpenseGraph;
