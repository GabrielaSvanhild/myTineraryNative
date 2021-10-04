import React from 'react'
import  { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList  } from '@react-navigation/drawer'
import { StyleSheet, Text, View,Image} from 'react-native';

import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import LogOut from '../components/LogOut'
import CitiesNavigator from './MainNavStack' 
import userActions from '../redux/actions/userActions'


const Drawer = createDrawerNavigator()

const Navigator = (props) => {
      
   const {token_store,firstName,src}=props

   useEffect(() => {
      const getUser = async () => {
         const token = await AsyncStorage.getItem('token')
         if (token) {
             props.logStorage(token)
         }
      }
      getUser()
  }, [])

  let name= token_store ? firstName : ""
  let photo=token_store ? src : "https://i.postimg.cc/cH5mWQQS/user.png"
console.log(src)

  const CustomDrawerContent = (props) => {
   return (
      <DrawerContentScrollView {...props}>
         <View style={styles.contenedor} >
            <Text style={styles.text}>  Welcome {name}</Text>
            <Image source={{uri: photo}} style={token_store ? styles.imageUser :styles.imageUserGenerico }/>
         </View>
         <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
   )
  }
 
   return (
      <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />} 
      screenOptions={{
         drawerActiveBackgroundColor:'#6b7ae99f',
         drawerContentStyle:{
            backgroundColor:"#efeae4"
         },
            drawerActiveTintColor:'#6b7ae9',
            drawerLabelStyle:{
               fontSize:20,
            }
         }}
         
      >
         <Drawer.Screen
            name='Home'
            component={Home}
            options={{
               /* headerShown: false, */
            }}
         />
         <Drawer.Screen name='Discover Cities' component={CitiesNavigator} />
         {!token_store 
         ?<>
            <Drawer.Screen name='Sign In' component={SignIn} />
            <Drawer.Screen name='Sign Up' component={SignUp} />
         </>
         :<Drawer.Screen name='Log Out' component={LogOut} />
   
         }
        
      </Drawer.Navigator>
   )
}

const mapStateToProps = state => {
   return {
      token_store: state.user.token,
      firstName:state.user.firstName,
      src:state.user.src
   }
}
const mapDispatchToProps = {
   logStorage: userActions.logAsyncStorage,
   logOut:userActions.logOut,
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigator)

const styles = StyleSheet.create({
   text:{
      color:'#6b7ae9',
      fontSize:30
   },
   contenedor:{
      alignItems:'center'
    
   },
   imageUser:{
      width:64,
      height:64,
      borderRadius:100
   },imageUserGenerico:{
      width:64,
      height:64,
   }
})