import React, { useState } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../database/firebase";

function AddTransactionScreen(props) {
    const [state, setState] = useState({
        Description: "",
        Amount: "",
        Type: "",
        dateId: "",
        DateString: "",
        Category: "",
    });

    const createTransaction = async () => {
        let date = Date.now();
        let category = " ";
        let today = new Date();
        let dateString =
            today.getMonth() +
            1 +
            "-" +
            today.getDate() +
            "-" +
            today.getFullYear() +
            "  " +
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

        if (state.Category == "") {
            category = "Others";
        } else {
            category = state.Category;
        }

        if (state.Description == "" || state.Amount == "" || state.Type == "") {
            alert("Complete all fields with a * .");
        } else {
            await firebase.db.collection("transactions").add({
                Description: state.Description,
                Amount: state.Amount,
                Type: state.Type,
                dateId: date,
                DateString: dateString,
                Category: category,
            });
            Alert.alert("Transaction", "New transaction added.", [
                {
                    text: "OK",
                    onPress: () => props.navigation.navigate("Home"),
                },
            ]);
        }
    };

    return (
        <LinearGradient
            colors={["#0464DE", "#3277D0", "#65A8FC"]}
            style={{ width: "100%", height: "100%" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={Styles.Container}>
                    <Text
                        style={{
                            flex: 1,
                            color: "#fff",
                            marginVertical: 35,
                            fontSize: 24,
                            justifyContent: "center",
                            alignSelf: "center",
                        }}>
                        Add a new transaction
                    </Text>
                    <View style={Styles.Wrapper}>
                        <View style={Styles.InputGroup}>
                            <TextInput
                                placeholder="Description *"
                                onChangeText={(value) =>
                                    setState({ ...state, Description: value })
                                }></TextInput>
                        </View>
                        <View style={Styles.InputGroup}>
                            <TextInput
                                placeholder="Amount *"
                                keyboardType="numeric"
                                onChangeText={(value) =>
                                    setState({ ...state, Amount: value })
                                }></TextInput>
                        </View>
                        <View style={Styles.InputGroup}>
                            <TextInput
                                placeholder="Income / Expense *"
                                onChangeText={(value) =>
                                    setState({ ...state, Type: value })
                                }></TextInput>
                        </View>
                        <View style={Styles.InputGroup}>
                            <TextInput
                                placeholder="Category"
                                onChangeText={(value) =>
                                    setState({ ...state, Category: value })
                                }></TextInput>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Button
                                title="Add Transaction"
                                onPress={() => createTransaction()}></Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 80,
    },
    Wrapper: {
        margin: 10,
        padding: 25,
        borderRadius: 5,
        marginHorizontal: 40,
        backgroundColor: "rgba(207, 226, 254, 0.3)",
    },
    InputGroup: {
        flex: 1,
        padding: 5,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        color: "#000",
    },
});

export default AddTransactionScreen;
