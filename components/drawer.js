import React, {useState} from 'react';
import { View, Text,TouchableOpacity,Image,ScrollView } from 'react-native';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AddTransactionScreen from '../screens/addTransaction'
import BalanceScreen from '../screens/transactionsScreen';
import foto from '../assets/foto.jpg'; 
import firebase from '../database/firebase'

function Home({ navigation }) {

  const calculateBalance = async () =>{

    await firebase.db.collection('transactions').get({
        Description: state.Description,
        Amount: state.Amount,
        Type: state.Type,
        dateId:date
    })
} 




  return (
        <View style={{ flex: 1, paddingTop:25, backgroundColor:'#3986F9' }}>
          <View>
            <TouchableOpacity
                style={{
                    justifyContent: 'center', alignItems: 'flex-start', paddingLeft:5}} 
                onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" color='#fff' size={40}/>
            </TouchableOpacity>
            <Text style={{fontSize:28, justifyContent:'center', alignItems:'flex-end', color:'#fff' , marginStart:50, paddingTop:0, paddingBottom:50}}>Hello, Tomas</Text>
            </View>
            <Image
                source= {foto} style={{width:150, height:150, borderRadius:80, alignSelf:'center'}}
            />
            <ScrollView  style={{ backgroundColor:'#fff', marginTop:30 , borderTopLeftRadius:15, borderTopRightRadius:15}}>
              <Text style={{textAlign:'center', margin:30, fontSize:20}}>Your Balance</Text>
              <Text style={{textAlign:'center', fontSize:16, color:'black'}}>4256</Text>
            </ScrollView>
        </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor:'rgba(38, 107, 209, 0.4)'}}>
      <Image source= {foto} style={{width:70, height:70, borderRadius:40,marginTop:35, marginLeft:15,alignSelf:'flex-start'}}/>
      <Text style={{margin:20, fontSize:14}}>Tomas Gomez Bermudez</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home"  component={Home}/>
      <Drawer.Screen name="Transactions" component={BalanceScreen} />
      <Drawer.Screen name="Add Transaction" component={AddTransactionScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;