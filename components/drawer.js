import * as React from 'react';
import { View, Text,TouchableOpacity,Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AddTransactionScreen from '../screens/addTransaction'
import BalanceScreen from '../screens/balanceScreen';
import { Avatar } from 'react-native-elements';
import foto from '../assets/foto.jpg'; 

function Home({ navigation }) {
  return (
        <View style={{ flex: 1, paddingTop:15, paddingLeft:5, backgroundColor:'#266BD1' }}>
            <TouchableOpacity
                style={{
                    justifyContent: 'flex-start', alignItems: 'flex-start'}} 
                onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={40}/>
            </TouchableOpacity>
            <Text style={{fontSize:34, justifyContent:'center', marginStart:25, paddingTop:30, paddingBottom:50}}>Hello, Tomas</Text>
            <Image
                source= {foto} style={{width:150, height:150, borderRadius:80, alignSelf:'center'}}
            />
        </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor:'rgba(38, 107, 209, 0.4)'}}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Balance" component={BalanceScreen} />
      <Drawer.Screen name="Add Transaction" component={AddTransactionScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;