import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';
import Carrousel from '../components/Carrousel';
import Footer from '../components/Footer';


const Home =(props)=>{
    return(
        <ScrollView style={styles.containerHome}>
            <View style={styles.container1}>
            
            <ImageBackground source={require('../assets/hero.png')} style={styles.hero}>
                <View style={styles.contenedorHero}>
                    <Text style={styles.h1}>MYtinerary</Text>
                        <View style={styles.contenedorHeroText}>
                            <Text style={styles.textoHero}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                            <Text style={styles.textoHero}>Let your adventure begin!</Text>
                        </View>
                    
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Discover Cities')}>
                    <View style={styles.boton}>
                        <Text style={styles.textoBoton}>Click here!</Text>
                    </View>
                </TouchableOpacity>
                </View>                   
            </ImageBackground>           
        </View>       
        <View style={styles.containerCarousel}>
            <Text style={styles.titleCarousel}>Popular MYtineraries</Text>
            <Carrousel home={true} activities={[]}/>                           
        </View>
        <Footer/>
     </ScrollView>
    )
}
export default Home

const styles = StyleSheet.create({
    containerHome:{
        backgroundColor: '#efeae4',
    },
    container1: {
      flex: 1,
      backgroundColor: '#efeae4',   
    },
        
    hero:{
        width:'100%',
        height:'100%',
    },
    h1:{
        fontSize:50,
        color:'#efeae4',
        fontFamily: 'Cinzel_400Regular', 
    },
    textoHero:{
        color:'#efeae4',
        textAlign:"center",
        fontSize:20,
        fontFamily:'NixieOne_400Regular'
    },
    boton: {
        backgroundColor: '#6b7ae9',
        width: 180,
        paddingVertical: 15,
        borderRadius: 20,
    },
    textoBoton: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
    },
    contenedorHero:{
        marginVertical:150,
        height:'50%',
        justifyContent:"space-between",
        alignItems:"center"
    },contenedorHeroText:{        
        height:'30%',
        justifyContent:"space-around"
    },
    containerCarousel:{
        marginVertical:50,
        alignItems:'center'
    },
    titleCarousel:{
        fontSize:35,
        textAlign:'center',
        marginBottom:10, 
        color:'#efeae4',
        fontWeight:"bold",
        backgroundColor: '#545468',
        borderRadius:8,
        width:"90%"
    }
    
  });