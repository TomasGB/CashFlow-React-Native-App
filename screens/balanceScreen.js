import React, { useEffect, useState } from 'react'
import {View, Text, Button, StyleSheet, ScrollView, SafeAreaView} from 'react-native'
import {ListItem} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import firebase from '../database/firebase'


const BalanceScreen = (props, navigation) =>{

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
        <SafeAreaView style={{flex:1, paddingTop:0}}>
        <View style={Styles.Container}>
            <View style={{paddingBottom:15}}>
                <Text style={{marginBottom:10,fontSize:24 , textAlign:'center', color:'#fff'}}>Your Transactions</Text>
            </View>
            <ScrollView style={{flex: 1, marginBottom:15, maxHeight:500}}>
                    {
                    transactions.map((transaction) => (
                    <ListItem 
                    key={transaction.dateId}>

                        <ListItem.Content style={Styles.Content}>
                            <ListItem.Title style={Styles.TextDescription}>{transaction.description}</ListItem.Title>
                            <Ionicons name='triangle-sharp' style={{alignSelf:'flex-end',alignItems:'center',color: 'green'}}></Ionicons>
                            <ListItem.Subtitle style={Styles.TextAmount}>{transaction.amount}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    ))}
            </ScrollView>
            <Button title='Add new Transaction' color="#609CF4" onPress={()=>props.navigation.navigate('addTransaction') }/>
        </View>
        </SafeAreaView>
    )
} 


const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#3986F9',
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
    },
})

export default BalanceScreen;