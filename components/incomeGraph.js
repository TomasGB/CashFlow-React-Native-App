import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";

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
        <View style={{ flex: 1, justifyContent: "flex-start", margin: 10 }}>
            <View
                style={{
                    backgroundColor: "rgba(189, 249, 253, 0.12)",
                    padding: 5,
                    borderRadius: 5,
                    padding: 15,
                }}>
                <Text style={Styles.IncomeTitle}>Incomes</Text>
                <View style={{ flexDirection: "row" }}>
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
                            {((workIncome * 100) / income).toFixed(2)} %
                        </Text>
                        <Text style={Styles.Text}>
                            ${workIncome.toFixed(2)}
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
                            {((investmensIncome * 100) / income).toFixed(2)} %
                        </Text>
                        <Text style={Styles.Text}>
                            ${investmensIncome.toFixed(2)}
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
                            {((otherIncome * 100) / income).toFixed(2)} %
                        </Text>
                        <Text style={Styles.Text}>
                            ${otherIncome.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text
                        style={{
                            padding: 10,
                            backgroundColor: "lightblue",
                            height: 200,
                            marginTop: 10,
                        }}>
                        income Graphs
                    </Text>
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
