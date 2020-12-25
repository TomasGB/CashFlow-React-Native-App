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

function Home({ navigation }) {
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
                            Hello, Tomas
                        </Text>
                    </View>
                </View>
                <Image
                    source={foto}
                    style={{
                        width: 150,
                        height: 150,
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
                            }}>
                            Analytics summary
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

function CustomDrawerContent(props) {
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
            <Text style={{ margin: 20, fontSize: 14 }}>
                Tomas Gomez Bermudez
            </Text>
            <DrawerItemList {...props} />
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

export default MyDrawer;
