import React from 'react';
import { StyleSheet, Text, View,ImageBackground,Keyboard,TouchableOpacity, Pressable } from 'react-native';

const CityCard=(props)=>{
    const {city}=props
    return(
        <View key={city._id} style={styles.card}>
        <Pressable
        onPress={() => {
            props.navigation.navigate('City', {
               id: city._id,
            })
         }}  
        >
            <ImageBackground
            source={{ uri: `https://mytinerary-felix.herokuapp.com/${city.src} `}}
            style={styles.photoCity}>
                <Text style={styles.textoCard}>{city.name}</Text>
            </ImageBackground>
        </Pressable>
         
      </View>
    )

}
export default CityCard

const styles=StyleSheet.create({
    hero:{
        width:'100%',
        height:300,
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        height: 50,
        color: '#6b7ae9',
        fontSize: 15,
        backgroundColor:'#ffffff8c',
        width: '60%',
        textAlign: 'center',
        marginVertical:10,
        borderWidth: 1,
        borderColor: "#6b7ae9",
        borderRadius: 5,

    },
    photoCity:{
        width:400,
        height:350,
        justifyContent:'flex-end'
    },
    card:{
        marginVertical:20
    },
    container:{
        alignItems:'center',
    },
    textoCard:{
        color:'#efeae4',      
        fontSize:20,
        textAlign:"center",
        backgroundColor:'rgba(0,0,0,.358)',
        height:30
    },textoNotFound:{
        marginVertical:50,
        fontSize:17,
        textAlign:'center',
        color:'#6b7ae9',
        fontWeight:'bold'
    },
    containerNotFound:{
        alignItems:'center',
    },
    imageNotFound:{
        width:128,
        height:128,
        marginBottom:50
    }
})