import React, { useState } from 'react'
import {View, Button,Text, TextInput, ScrollView, StyleSheet, SafeAreaView} from 'react-native'
import firebase from '../database/firebase'


function StatisticsScreen(props) {
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={Styles.Container}>
            <Text style={{flex:1, color:"#000", marginTop:50, fontSize:24, justifyContent:'center', alignSelf:'center'}}>
                Statistics</Text>
            </ScrollView>
        </SafeAreaView>
    );
} 


const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
        backgroundColor: '#3986F9',
    }
})

export default StatisticsScreen;