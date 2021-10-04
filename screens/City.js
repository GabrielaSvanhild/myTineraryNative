import React from 'react';
import {useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View,ScrollView,TouchableWithoutFeedback,ImageBackground,TextInput,FlatList,Keyboard } from 'react-native';
import { connect } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions'
import Itinerary from "../components/Itinerary"
import Footer from '../components/Footer';
import BouncingPreloader from 'react-native-bouncing-preloader';

const City=(props)=>{
    const [city,setCity]=useState({})
    const [fetcheo,setFetcheo]=useState(false)
   const[loading,setLoading]=useState(true) 

    useEffect(()=>{
        setCity(props.cities.find(city=> city._id===props.route.params.id))
        props.getItinerariesOfOneCity(props.route.params.id)
        .then((res)=>{
             if(res.success){
                setLoading(false)
             }
        })
        .catch((e)=>console.log(e))
    },[props.route.params.id, fetcheo])

    const icons=["https://i.postimg.cc/R0TpdyJF/axe.png","https://i.postimg.cc/NMJJqX4v/viking-helmet.png "]



    if(loading){
        return(
            <View style={styles.preloaderContainer}>
                <BouncingPreloader
                icons={icons}
                leftDistance={-100}
                rightDistance={-150}
                speed={2000}
                />
            </View>
        )
    }

    return(
        <ScrollView style={styles.contenedor} >
            <ImageBackground
            source={{ uri: `https://mytinerary-felix.herokuapp.com/${city.src} `}}
            style={styles.photoCity} >
                 <Text style={styles.textoCard}> {city.name} </Text>
            </ImageBackground>
           
           
            {props.itineraries_city.length === 0
            ? <View style={{marginTop: 90,  alignItems: 'center'}}>
                <Text style={{color: '#6b7ae9', fontSize: 25, textAlign: 'center', padding: 30, fontWeight: 'bold'}}>Sorry, There are no itineraries yet for this city</Text>
                <Image style={styles.imageNotFound} source={require('../assets/confused.png')}  />
            </View> 
            : <View style={{marginTop: '10%', marginBottom: '15%'}}>
                {props.itineraries_city.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary} fetcheo={fetcheo} setFetcheo={setFetcheo} navigation={props.navigation}/>)}
            </View> 
            }
            <Footer/>
        </ScrollView>
        
    )

}
const mapStateToProps = (state)=>{
    return{ 
       cities: state.cities.total_cities,
       itineraries_city:state.itineraries.itineraries_city
    }
}
const mapDispatchToProps = {
    getItinerariesOfOneCity: itinerariesActions.getItinerariesOfOneCity,
 }
export default connect(mapStateToProps, mapDispatchToProps)(City)

const styles = StyleSheet.create({
    texto:{
        fontSize:40
    },
    photo:{
        width:"100%",
        height:400
    },
    imageNotFound:{
        width:128,
        height:128,
        marginBottom:50
    },
    textoCard:{
        color:'#efeae4',      
        fontSize:40,
        fontWeight:'bold',
        textAlign:"center",
        backgroundColor:'rgba(0,0,0,.358)',
        
    },photoCity:{
        width:420,
        height:350,
        justifyContent:'flex-end'
        
    },contenedor:{
        backgroundColor: '#efeae4',
    },
    preloaderContainer:{
        width:"100%",
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    }
})