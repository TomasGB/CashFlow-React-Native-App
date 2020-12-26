import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";

function IncomeGraph() {
    const [income, setIncome] = useState(0);
    const [workIncome, setWorkIncome] = useState(0);
    const [investmensIncome, setinvestmensIncome] = useState(0);

    useEffect(() => {
        firebase.db
            .collection("transactions")
            .orderBy("dateId", "desc")
            .onSnapshot((querySnapshot) => {
                let acumIncome = 0;
                let workIncomeAcum = 0;
                let investmentsIncomeAcum = 0;

                querySnapshot.docs.forEach((doc) => {
                    if (
                        (doc.data().Type == "income") |
                        (doc.data().Type == "Income")
                    ) {
                        acumIncome = acumIncome + parseFloat(doc.data().Amount);

                        if (doc.data().Category == "Work") {
                            workIncomeAcum =
                                workIncomeAcum + parseFloat(doc.data().Amount);
                        } else {
                            if (doc.data().Category == "Investments") {
                                investmentsIncomeAcum =
                                    investmentsIncomeAcum +
                                    parseFloat(doc.data().Amount);
                            }
                        }
                    }

                    setIncome(acumIncome);
                    setWorkIncome(workIncomeAcum);
                    setinvestmensIncome(investmentsIncomeAcum);
                });
            });
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 15 }}>
            <View
                style={{
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    marginVertical: 15,
                }}>
                <Text>Work income</Text>
                <Text
                    style={{
                        justifyContent: "flex-start",
                        alignSelf: "center",
                    }}>
                    {((workIncome * 100) / income).toFixed(2)} %
                </Text>
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignSelf: "center",
                }}>
                <Text>Investments income</Text>
                <Text
                    style={{
                        justifyContent: "center",
                        alignSelf: "center",
                    }}>
                    {((investmensIncome * 100) / income).toFixed(2)} %
                </Text>
            </View>
        </View>
    );
}

export default IncomeGraph;
