import React, {useState, useEffect} from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function StatisticsScreen(props) {
    return (
        <SafeAreaView style={Styles.Container}>
            <ScrollView>
                <View style={{flexDirection:'row', marginTop:15,marginBottom:35}}>
                    <Text style={{fontSize:22, justifyContent:'center', alignSelf:'center', color:'#fff', marginLeft:20}}>Statistics</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 


const Styles =StyleSheet.create({
    Container: {
        flex: 1,
        paddingVertical: 35,
        backgroundColor: '#3986F9',
    }
})

export default StatisticsScreen;