import { useLinkProps} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {View, Text, Button, StyleSheet, ScrollView, FlatList, Pressable} from 'react-native'
import {BottomSheet, ListItem} from 'react-native-elements'
import firebase from '../database/firebase'
import uuid from 'react-native-uuid'

const HomeScreen = (props) =>{

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase.db.collection('transactions').orderBy("dateId", "desc").onSnapshot(querySnapshot =>{
            const transactions = [];

            querySnapshot.docs.forEach(doc =>{
                transactions.push({
                    id: doc.id,
                    description:doc.data().Description,
                    amount:doc.data().Amount,
                    type:doc.data().Type,
                    dateId: doc.data().dateId
                })
            });
            setTransactions(transactions)
            console.log(transactions)
        });
    },[]);

    return(
        
        <View style={Styles.Container}>
            <View style={{paddingBottom:15}}>
                <Text style={{marginBottom:10,fontSize:24 , textAlign:'center'}}>Balance</Text>
                <View>
                <Text style={{marginBottom:10, fontSize:18 ,textAlign:'center'}}>8500</Text>
                </View>
            </View>
            <ScrollView style={{flex: 1, padding: 10, marginBottom:15, maxHeight:350 }}>
                    {
                    transactions.map((transaction) => (
                    <ListItem 
                    key={transaction.dateId}>
                        <ListItem.Content style={Styles.Content}>
                            <ListItem.Title style={Styles.TextDescription}>{transaction.description}</ListItem.Title>
                            <ListItem.Subtitle style={Styles.TextAmount}>{transaction.amount}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    ))}
            </ScrollView>
            <Button title='Add new Transaction' color="#609CF4" onPress={()=>props.navigation.navigate('addTransaction') }/>
        </View>
        
    )
} 

const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#266BD1',

    },
    Button: {
        backgroundColor:'white',
        padding:5,
        borderRadius: 2,
        margin:15
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
        margin:5,
    }
})

export default HomeScreen