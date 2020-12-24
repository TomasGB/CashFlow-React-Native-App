import React, { useState } from 'react'
import {View, Button,Text, TextInput, ScrollView, StyleSheet, SafeAreaView} from 'react-native'
import firebase from '../database/firebase'


function AddTransactionScreen(props) {

    const [state, setState] = useState({
        Description:"",
        Amount:"",
        Type:"",
        dateId: "",
        Area: ""
    })

    const createTransaction = async () =>{
        let date = Date.now();
        let area = '';

        if (state.Area == ''){ await area == 'others' }
            else{ await
                area == state.Area;
            }

        if (state.Description == '' || state.Amount == '' || state.Type == ''){
            alert('Complete all fields with a * .')
        }
        else{
            await firebase.db.collection('transactions').add({
                Description: state.Description,
                Amount: state.Amount,
                Type: state.Type,
                dateId:date,
                Area: area
            })
            alert('Transaction Added')
            props.navigation.navigate('Home')
        }
    } 

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={Styles.Container}>
            <Text style={{flex:1, color:"#fff", marginVertical:35, fontSize:24, justifyContent:'center', alignSelf:'center'}}>
                Add a new transaction</Text>
                <View style={Styles.Wrapper}>
                    <View style={Styles.InputGroup}>
                        <TextInput placeholder='Description *'
                            onChangeText={(value) => setState({ ...state, Description: value })}>
                        </TextInput>
                    </View>
                    <View style={Styles.InputGroup}>
                        <TextInput placeholder='Amount *'
                            keyboardType = 'numeric'
                            onChangeText={(value) => setState({ ...state, Amount: value})}>
                        </TextInput>
                    </View>
                    <View style={Styles.InputGroup}>
                        <TextInput placeholder='Income / Expense *'
                            onChangeText={(value) => setState({ ...state, Type: value })}>
                        </TextInput>
                    </View>
                    <View style={Styles.InputGroup}>
                        <TextInput placeholder='Area'
                            onChangeText={(value) => setState({ ...state, Area: value })}>
                        </TextInput>
                    </View>
                    <View style={{marginTop:15}}>
                        <Button title='Add Transaction' onPress={() => createTransaction()}></Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 


const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 80,
        backgroundColor: '#3986F9'
    },
    Wrapper: {
        margin: 10,
        padding: 25,
        borderRadius: 5,
        marginHorizontal:40,
        backgroundColor: 'rgba(207, 226, 254, 0.3)'
    },
    InputGroup: {
        flex: 1,
        padding: 5,
        marginBottom: 15,
        borderBottomWidth:1 ,
        borderBottomColor: '#cccccc',
        color: '#000'
    }
})

export default AddTransactionScreen