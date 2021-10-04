import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';
const NavBar =()=>{
    return(
        <View style={styles.nav}>
            
            <Image source={require('../assets/logo_mytinerary.png')} style={styles.logo}/>
                <View style={styles.containerNavText}>
                    <Text style={styles.textoNav}>Home</Text>
                    <Text style={styles.textoNav}>Cities</Text>
                </View>
                <Image source={require('../assets/user.png')} style={styles.navUser}/>
            </View>
    )
}
export default NavBar

const styles= StyleSheet.create({
    nav:{
        backgroundColor: '#efeae4',
        width:'100%',
        height:'auto',
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:"space-between",
        paddingHorizontal:10,
    },
    textoNav:{
      fontSize:20,
      color:'#6b7ae9'
    },
    navUser:{
        height:40,
        width:40
    },
    containerNavText:{
        flexDirection:'row',
        width:'40%',
        justifyContent:"space-between",
        alignItems:"center",
       
    },
    logo:{
        height:75,
        width:75
    },
})