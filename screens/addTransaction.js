import { useLinkProps } from '@react-navigation/native'
import React, { useState } from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../database/firebase'


function AddTransactionScreen() {

    const [state, setState] = useState({
        Description:"",
        Amount:"",
        Type:"",
    })

    const createTransaction = async () =>{
        if (state.Description == '' || state.Amount == '' || state.Type == ''){
            alert('Complete all fields.')
        }
        else{
            await firebase.db.collection('transactions').add({
                Description: state.Description,
                Amount: state.Amount,
                Type: state.Type
            })
            alert('Transaction Added')
            props.navigation.navigate('homeScreen')
        }
    } 

    return (
        <ScrollView style={Styles.Container}>
            <View style={Styles.Wrapper}>
                <View style={Styles.InputGroup}>
                    <TextInput placeholder='Description'
                        onChangeText={(value) => setState({ ...state, Description: value })}>
                    </TextInput>
                </View>
                <View style={Styles.InputGroup}>
                    <TextInput placeholder='Amount'
                        onChangeText={(value) => setState({ ...state, Amount: value })}>
                    </TextInput>
                </View>
                <View style={Styles.InputGroup}>
                    <TextInput placeholder='Income / Expense'
                        onChangeText={(value) => setState({ ...state, Type: value })}>
                    </TextInput>
                </View>
                <View style={Styles.InputGroup}>
                    <Button title='Add Transaction' onPress={() => createTransaction()}></Button>
                </View>
            </View>
        </ScrollView>
    );
} 


const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        padding: 35,
        backgroundColor: "#2061BE"
    },
    Wrapper: {
        margin: 10,
        padding: 25,
        borderRadius: 5,
        backgroundColor: 'rgba(207, 226, 254, 0.1)'
    },
    InputGroup: {
        flex: 1,
        padding: 5,
        marginBottom: 15,
        borderBottomWidth:1 ,
        borderBottomColor: '#cccccc',
        color: '#00000'
    }
})

export default AddTransactionScreen