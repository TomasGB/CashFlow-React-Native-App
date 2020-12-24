import React, {useState, useEffect} from 'react';
import { View, Text,TouchableOpacity,Image,ScrollView } from 'react-native';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import BalanceScreen from '../screens/transactionsScreen';
import StatisticsScreen from '../screens/statisticsScreen';
import foto from '../assets/foto.jpg'; 
import Balance from './balance';

function Home({ navigation }) {
  
  return (
        <View style={{ flex: 1, paddingTop:25, backgroundColor:'#3986F9' }}>
          <View>
            <View style={{flexDirection:'row', marginTop:15,marginBottom:35}}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center', alignItems: 'flex-start', paddingLeft:5}} 
                    onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" color='#fff' size={40}/>
                </TouchableOpacity>
                <Text style={{fontSize:22, justifyContent:'center', alignSelf:'center', color:'#fff', marginLeft:20}}>Hello, Tomas</Text>
            </View>
          </View>
            <Image
                source= {foto} style={{width:150, height:150, borderRadius:80, alignSelf:'center'}}
            />
            <ScrollView  style={{backgroundColor:'#fff', marginTop:30 , borderTopLeftRadius:15, borderTopRightRadius:15}}>

              <Text style={{textAlign:'center', margin:0}}>
                <Balance/>
              </Text>
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
      <Drawer.Screen name="Statistics" component={StatisticsScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;