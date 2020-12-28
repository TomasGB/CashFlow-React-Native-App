import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import { PieChart } from "react-native-chart-kit";

function ExpensesPieChart() {
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
    const data = [
        {
            name: "Bills",
            amount: billsExpense,
            color: "rgba(5, 5, 220,0.7)",
            legendFontColor: "#000000",
            legendFontSize: 15,
        },
        {
            name: "Food",
            amount: foodExpense,
            color: "rgba(57, 57, 249,0.7)",
            legendFontColor: "#000000",
            legendFontSize: 15,
        },
        {
            name: "Car",
            amount: carExpense,
            color: "rgba(60, 98, 175,0.4)",
            legendFontColor: "#000000",
            legendFontSize: 15,
        },
        {
            name: "Others",
            amount: otherExpense,
            color: "rgba(86, 64, 167,0.7)",
            legendFontColor: "#000000",
            legendFontSize: 15,
        },
    ];
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", margin: 10 }}>
            <View>
                <PieChart
                    data={data}
                    width={screenWidth - 10}
                    height={150}
                    chartConfig={chartConfig}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft={-25}
                    center={(0, 0)}
                />
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
export default ExpensesPieChart;
