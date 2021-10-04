import React from 'react';
import { StyleSheet, Text, Image, View,ScrollView,TouchableWithoutFeedback,ImageBackground,TextInput,FlatList,Keyboard,TouchableOpacity, Pressable } from 'react-native';
import { useEffect,useState} from 'react'
import citiesActions from '../redux/actions/citiesActions'
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import { showMessage, hideMessage } from "react-native-flash-message";
import CityCard from '../components/CityCard' 
import BouncingPreloader from 'react-native-bouncing-preloader';

const Cities =(props)=>{
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        props.getCities()
        .then((res)=>{
            if(res && res.error){
                showMessage({
                    message: 'Sorry we have technical problems ',
                    type: "warning",
                    backgroundColor: "#6b7ae9",
                  });
            }
            setLoading(false)
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const inputHandler=(e)=>{
      props.filterCities(e.nativeEvent.text)
    }
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
        <ScrollView style={styles.containerCities}>
            <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
         
        <ImageBackground style={styles.hero}  source={require('../assets/hero-city.png')}>
        <TextInput
                    style={styles.input} 
                    placeholder="Search Your Destination" 
                    placeholderTextColor= '#6b7ae9'
                    onChange={inputHandler}
                    />
        </ImageBackground>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
        {
            props.filteredCities.length===0 
            ?<View style={styles.containerNotFound}>
                <Text style={styles.textoNotFound}>Sorry, There are not results for your search. Try another one!</Text> 
                <Image style={styles.imageNotFound} source={require('../assets/confused.png')}  />
            </View>
            : props.filteredCities.map(city=>{
               return <CityCard key={city._id} city={city} route={props.route} navigation={props.navigation}/>
            })
             
        }
        
            
        </View>
        <Footer/>
        
        </ScrollView>
    )
   
}
const mapDispatchToProps = {
    getCities: citiesActions.getAllCities,
    filterCities:citiesActions.filterCities
 }
 const mapStateToProps = (state)=>{
     return{ 
        filteredCities: state.cities.filtered_cities,
     }
 }
 
export default connect(mapStateToProps, mapDispatchToProps)(Cities)
const styles=StyleSheet.create({
    containerCities:{
        backgroundColor: '#efeae4',
    },
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
    },
    preloaderContainer:{
        width:"100%",
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    }
})
