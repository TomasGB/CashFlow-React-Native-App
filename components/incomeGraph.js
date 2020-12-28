import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import IncomesPieChart from "./incomesPieChart";

function IncomeGraph() {
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

    return (
        <View style={{ flex: 1, justifyContent: "flex-start", margin: 5 }}>
            <View
                style={{
                    backgroundColor: "rgba(255,255,255 , 0.3)",
                    borderRadius: 5,
                    padding: 10,
                    margin: 5,
                }}>
                <Text style={Styles.IncomeTitle}>Incomes</Text>
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
                                name="folder-outline"
                                size={20}></Ionicons>
                            <Text style={Styles.TitleText}>Work</Text>
                        </View>
                        <Text style={Styles.Text}>
                            $ {workIncome.toFixed(2)}
                        </Text>
                    </View>
                    <View style={Styles.Category}>
                        <View
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <Ionicons name="cash-outline" size={20}></Ionicons>
                            <Text style={Styles.TitleText}>Investments</Text>
                        </View>
                        <Text style={Styles.Text}>
                            $ {investmensIncome.toFixed(2)}
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
                            $ {otherIncome.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <IncomesPieChart />
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
    IncomeTitle: {
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

export default IncomeGraph;
