import React from 'react'
import {StyleSheet, SafeAreaView} from 'react-native'
import MyDrawer from '../components/drawer'

const HomeScreen = (props) =>{
    return(
        <SafeAreaView style={{flex:1}}>
            <MyDrawer/>
        </SafeAreaView>
    )
} 


const Styles =StyleSheet.create({

})

export default HomeScreen