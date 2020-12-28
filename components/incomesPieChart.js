import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import { PieChart } from "react-native-chart-kit";

function IncomesPieChart() {
    const [income, setIncome] = useState(0);
    const [workIncome, setWorkIncome] = useState(0);
    const [investmensIncome, setinvestmensIncome] = useState(0);
    const [otherIncome, setOtherIncome] = useState(0);

    useEffect(() => {
        firebase.db
            .collection("transactions")
            .orderBy("dateId", "desc")
            .onSnapshot((querySnapshot) => {
                let acumIncome = 0;
                let workIncomeAcum = 0;
                let investmentsIncomeAcum = 0;
                let otherIncomeAcum = 0;

                querySnapshot.docs.forEach((doc) => {
                    if (
                        (doc.data().Type == "income") |
                        (doc.data().Type == "Income")
                    ) {
                        acumIncome = acumIncome + parseFloat(doc.data().Amount);

                        if (doc.data().Category == "Work") {
                            workIncomeAcum =
                                workIncomeAcum + parseFloat(doc.data().Amount);
                        } else if (doc.data().Category == "Investments") {
                            investmentsIncomeAcum =
                                investmentsIncomeAcum +
                                parseFloat(doc.data().Amount);
                        } else {
                            otherIncomeAcum =
                                otherIncomeAcum + parseFloat(doc.data().Amount);
                        }
                    }
                });
                setIncome(acumIncome);
                setWorkIncome(workIncomeAcum);
                setinvestmensIncome(investmentsIncomeAcum);
                setOtherIncome(otherIncomeAcum);
            });
    }, []);

    const data = [
        {
            name: "Investments",
            amount: investmensIncome,
            color: "rgba(5, 5, 220,0.7)",
            legendFontColor: "#000000",
            legendFontSize: 15,
        },
        {
            name: "Work",
            amount: workIncome,
            color: "rgba(57, 57, 249,0.7)",
            legendFontColor: "#000000",
            legendFontSize: 15,
        },
        {
            name: "Others",
            amount: otherIncome,
            color: "rgba(86, 64, 167,0.3)",
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
        barPercentage: 0.9,
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
export default IncomesPieChart;
