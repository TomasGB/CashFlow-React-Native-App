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
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../database/firebase";
import { Picker } from "@react-native-picker/picker";

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
        let category = "";
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
            today.getMinutes();

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
            Alert.alert("transaction", "New transaction added.", [
                {
                    text: "OK",
                    onPress: () => props.navigation.navigate("Home"),
                },
            ]);
        }
    };
    console.log(state);
    return (
        <LinearGradient
            colors={["#0464DE", "#3277D0", "#65A8FC"]}
            style={{ width: "100%", height: "100%" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 50,
                    }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            alignItems: "flex-start",
                            paddingLeft: 5,
                            marginLeft: 10,
                        }}
                        onPress={() => props.navigation.navigate("Home")}>
                        <Ionicons name="arrow-back" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={Styles.Container}>
                    <Text
                        style={{
                            flex: 1,
                            color: "#fff",
                            marginBottom: 25,
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
                        <Picker
                            selectedValue={state.Category}
                            style={{ height: 50, width: 250 }}
                            onValueChange={(itemValue) => {
                                setState({ ...state, Category: itemValue });
                            }}>
                            <Picker.Item label="Other" value="Others" />
                            <Picker.Item label="Bills" value="Bills" />
                            <Picker.Item label="Food" value="Food" />
                            <Picker.Item
                                label="Car Expenses"
                                value="Car expenses"
                            />
                            <Picker.Item label="Work" value="Work" />
                            <Picker.Item
                                label="Investments"
                                value="Investments"
                            />
                        </Picker>
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
