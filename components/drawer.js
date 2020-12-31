import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import BalanceScreen from "../screens/transactionsScreen";
import AnalyticsScreen from "../screens/analyticsScreen";
import foto from "../assets/foto.jpg";
import Balance from "./balance";
import TransactionList from "../components/transactionList";
import ExpensesPieChart from "./expensesPieChart";
import IncomesPieChart from "./incomesPieChart";
import firebase from "../database/firebase";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/user";

function Home({ navigation }) {
    const [actualUser, setActualUser] = useState();

    useEffect(() => {
        firebase.db
            .collection("users")
            .where("uid", "==", "tomas@gmail.com")
            .onSnapshot((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    setActualUser(doc.data().Name);
                });
            });
        setActualUser();
    }, []);

    return (
        <LinearGradient
            colors={["#0B73F8", "#3277D0", "#65A8FC"]}
            style={{ width: "100%", height: "100%" }}>
            <View style={{ flex: 1, paddingTop: 25 }}>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 15,
                            marginBottom: 35,
                        }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "flex-start",
                                paddingLeft: 5,
                            }}
                            onPress={() => navigation.openDrawer()}>
                            <Ionicons name="menu" color="#fff" size={40} />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 22,
                                justifyContent: "center",
                                alignSelf: "center",
                                color: "#fff",
                                marginLeft: 20,
                            }}>
                            Hello, tomas
                        </Text>
                    </View>
                </View>
                <Image
                    source={foto}
                    style={{
                        width: 125,
                        height: 125,
                        borderRadius: 80,
                        alignSelf: "center",
                    }}
                />
                <ScrollView
                    style={{
                        backgroundColor: "#fff",
                        marginTop: 30,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}>
                    <Text
                        style={{
                            margin: 0,
                            justifyContent: "center",
                            alignSelf: "center",
                        }}>
                        <Balance />
                    </Text>
                    <View>
                        <Text
                            style={{
                                color: "grey",
                                fontSize: 16,
                                marginLeft: 15,
                            }}>
                            Latest transactions
                        </Text>
                        <TransactionList />
                    </View>
                    <View>
                        <Text
                            style={{
                                color: "grey",
                                fontSize: 16,
                                marginLeft: 15,
                                marginTop: 10,
                            }}>
                            Analytics summary
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 15,
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#000",
                            }}>
                            Incomes
                        </Text>
                        <IncomesPieChart />
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 15,
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#000",
                            }}>
                            Expenses
                        </Text>
                        <ExpensesPieChart />
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

function CustomDrawerContent(props) {
    const handleSignout = async () => {
        await firebase.auth.signOut();
        props.navigation.navigate("Login");
    };

    firebase.auth.onAuthStateChanged((user) => {
        if (user) {
            this.props.getUser(user.Name);
            if (this.props.user != null) {
                console.log(user.Name);
            }
        }
    });
    return (
        <DrawerContentScrollView
            {...props}
            style={{ backgroundColor: "rgba(38, 107, 209, 0.4)" }}>
            <Image
                source={foto}
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 40,
                    marginTop: 35,
                    marginLeft: 15,
                    alignSelf: "flex-start",
                }}
            />
            <Text style={{ margin: 20, fontSize: 14 }}>{props.Name}</Text>
            <DrawerItemList {...props} />
            <View style={{ flex: 1, marginLeft: 20, marginTop: 230 }}>
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 70,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        handleSignout();
                    }}>
                    <Ionicons
                        name="log-out-outline"
                        size={30}
                        color={"rgba(0,0,0, 0.5)"}
                    />
                    <Text style={{ marginLeft: 5 }}>Log out</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Transactions" component={BalanceScreen} />
            <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
        </Drawer.Navigator>
    );
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        { updateEmail, updatePassword, login, getUser },
        dispatch
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(MyDrawer);
