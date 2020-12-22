import { useLinkProps} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {View, Text, Button, StyleSheet, ScrollView, SafeAreaView} from 'react-native'
import {BottomSheet, ListItem} from 'react-native-elements'
import firebase from '../database/firebase'
import AddTransactionScreen from './addTransaction'
import MyDrawer from '../components/drawer'




const HomeScreen = (props) =>{
    return(
        <SafeAreaView style={{flex:1, paddingTop:25}}>
            <MyDrawer/>
        </SafeAreaView>
    )
} 


const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#266BD1',

    },
    TextDescription: {
        fontWeight: 'bold',
    },
    TextAmount: {
        fontSize: 15,
    },
    Content:{
        marginBottom:15,
    },
    list: {
        margin:0,
        padding:0
    }
})

export default HomeScreen