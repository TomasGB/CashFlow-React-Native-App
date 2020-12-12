import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

const HomeScreen = () =>{
    return(
        <View style={Styles.InputGroup}>
            <Button title='Add a Transaction'></Button>
        </View>
    )
} 

const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        padding: 35
    },
    InputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth:1 ,
        borderBottomColor: '#cccccc'
    }
})

export default HomeScreen