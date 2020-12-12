import React, { useState } from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'




function AddTransactionScreen() {

    const [state, setState] = useState({
        Description:"",
        Amount:"",
        Type:"",
    })

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
                    <Button title='Add Transaction' onPress={(value) => console.log(state)}></Button>
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