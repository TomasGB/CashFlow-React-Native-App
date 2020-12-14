import { useLinkProps} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {View, Text, Button, StyleSheet, ScrollView, FlatList, Pressable} from 'react-native'
import {BottomSheet, ListItem} from 'react-native-elements'
import firebase from '../database/firebase'

const HomeScreen = (props) =>{

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase.db.collection('transactions').onSnapshot(querySnapshot =>{
            const transactions = [];

            querySnapshot.docs.forEach(doc =>{
                transactions.push({
                    id: doc.id,
                    description:doc.data().Description,
                    amount:doc.data().Amount,
                    type:doc.data().Type
                })
            });
            setTransactions(transactions)
            console.log(transactions)
        });
    },[]);

    return(
        
        <ScrollView style={Styles.Container}>
            <Button title='Add new Transaction' color="#0F58B0" onPress={()=>props.navigation.navigate('addTransaction') }></Button>
            <View>
                {
                transactions.map((transaction) => (
                <ListItem 
                key={transaction.id} >
                    <ListItem.Content backgroundColor='red'>
                        <ListItem.Title style={Styles.TextDescription}>{transaction.description}</ListItem.Title>
                        <ListItem.Subtitle style={Styles.TextAmount}>{transaction.amount}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                ))}
            </View>
        </ScrollView>
        
    )
} 

const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#266BD1',
    },
    Transaction:{
        flex:1,
        padding: 0,
        backgroundColor: '#609CF4',
        margin:10,
    },
    Button: {
        backgroundColor:'white',
        padding:5,
        justifyContent: 'right',
        borderRadius: 2
    },
    TextDescription: {
        fontWeight: 'bold',
    },
    TextAmount: {
        fontSize: 15,
    }
})

export default HomeScreen