import React, { useEffect, useState } from 'react'
import {View, Text, Button, StyleSheet, ScrollView, SafeAreaView, FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import firebase from '../database/firebase';


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
                <Text style={{marginTop: 25,fontSize:24 , textAlign:'center', color:'#fff'}}>Your Transactions</Text>
            </View>
                <View style={{maxHeight:400, marginVertical:35, marginHorizontal:20}}>
                <FlatList
                    data={transactions}
                    renderItem={({item}) =>(
                        <View style={Styles.transactionsView}>
                            <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                                
                                <Text style={{alignSelf:'flex-start',fontSize:20, color:'#000', marginBottom:5}}>{item.description}</Text>
                                <Ionicons name='triangle-sharp' style={[item.type == 'Expense' ? Styles.ArrowExpense: Styles.ArrowIncome]}></Ionicons>
                            </View>
                            <Text style={{fontSize:16, color:'#fff', marginLeft:5}}>{item.amount}</Text>
                        </View>)
                }
                
                />
                </View>

            <Button title='Add new Transaction' color="#609CF4" onPress={()=>props.navigation.navigate('addTransaction') }/>
        </View>
        </SafeAreaView>
    )
} 


const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
        backgroundColor: '#3986F9',
    },
    transactionsView:{
        backgroundColor:'rgba(134, 216, 247 , 0.2)',
        marginVertical:5,
        padding:10,
        borderRadius:5,
        shadowColor: "#000",
    },
    ArrowExpense:{
        fontSize:16,
        alignSelf:'flex-end',
        alignItems:'center',
        color: 'red',
        transform: [{rotateX: '180deg'}]
    },
    ArrowIncome:{
        fontSize:16,
        alignSelf:'flex-end',
        alignItems:'center',
        color: 'green'
    }
})

export default BalanceScreen;