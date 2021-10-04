import Carousel from 'react-native-snap-carousel';
import React from 'react';
import { StyleSheet, Text, View ,ImageBackground} from 'react-native';
 
const Carrousel=(props)=>{
    const {home, activities}=props

    cities=[
        {
            src:require('../assets/oslo.jpg'),
            text:"Oslo-Norway",
            id:"oslo"
        },
        {
            src:require('../assets/arendal.jpg'),
            text:"Arendal-Norway",
            id:"arendal"
        },
        {
            src:require('../assets/bergen.jpeg'),
            text:"Bergen-Norway",
            id:"bergen"
        },
        {
            src:require('../assets/stavanger.jpg'),
            text:"Stavanger-Norway",
            id:"stavanger"
        },
        {
            src:require("../assets/Skelleftea.jpg"),
            text:"Skellefteå-Sweden",
            id:"Skellefteå"
        },
        {
            src:require("../assets/estocolmo.jpg"),
            text:"Stockholm-Sweden",
            id:"Stockholm"                 
        },
        {
            src:require("../assets/helsinki.jpeg"),
            text:"Helsinki-Finland", 
            id:"Helsinki"  
        },
        {
            src:require("../assets/rovaniemi.jpeg"),
            text:"Rovaniemi-Finland",
            id:"Rovaniemi"
        },
        {
            src: require("../assets/copenahue.jpeg"),
           text:"Copenhagen-Denmark",
           id:"Copenhagen"
       },
       {
        src:require("../assets/Reykjavik.jpeg"),
        text:"Reykjavik-Iceland",
        id:"Reykjavik"                  
        },
        {
            src:require("../assets/Selfoss.jpeg"),
            text:"Selfoss-Iceland",
            id:"Selfoss"   

        },
     
        
        
     
       /* 
          {
            src:require("/assets/Skelleftea.jpg"),
            texto:"Skellefteå-Sweden",
            id:"Skellefteå"
        },
        {
            src:require("../assets/estocolmo.jpg"),
            texto:"Stockholm-Sweden",
            id:"Stockholm"                 
        },
        {
            src:require("../assets/helsinki.jpeg"),
            texto:"Helsinki-Finland", 
            id:"Helsinki"  
        },
        {
            src:require("../assets/rovaniemi.jpeg"),
            texto:"Rovaniemi-Finland",
            id:"Rovaniemi"
        },
        {
            src: require("../assets/copenahue.jpeg"),
           texto:"Copenhagen-Denmark",
           id:"Copenhagen"
       },
       {
        src:require("../assets/Reykjavik.jpeg"),
        texto:"Reykjavik-Iceland",
        id:"Reykjavik"                  
        },
        {
            src:require("../assets/Selfoss islandia.jpeg"),
            texto:"Selfoss-Iceland",
            id:"Selfoss"   

        },
        {
            src:require("/assets/Saariselkä.jpeg"),
            texto:"Saariselkä-Findald",
            id:"Saariselka"

        }
       
       {
            src:[{ruta:"/assets/Skellefteå.jpg",
            texto:"Skellefteå-Sweden", 
        },
        {
            ruta:"/assets/estocolmo.jpg",
            texto:"Stockholm-Sweden",                    
        },
        {
            ruta:"/assets/helsinki.jpeg",
            texto:"Helsinki-Finland", 
        },
        {
            ruta:"/assets/rovaniemi.jpeg",
            texto:"Rovaniemi-Finland",
        }],
        },
        {
             src:[{ruta:"/assets/copenahue.jpeg",
            texto:"Copenhagen-Denmark", 
        },
    
        {
            ruta:"/assets/Reykjavik.jpeg",
            texto:"Reykjavik-Iceland",                    
        },
        {
            ruta:"/assets/Selfoss islandia.jpeg",
            texto:"Selfoss-Iceland", 
        },
        {
            ruta:"/assets/Saariselkä.jpeg",
            texto:"Saariselkä-Findald",
        }],
        } */
    ]
 
    _renderItem = ({item}) => {
        return (
            <View key={item.id} style={styles.slide}>
                <ImageBackground source={item.src} style={styles.image}>
                    <Text style={styles.title}>{ item.text }</Text>
                </ImageBackground>
                
            </View>
        );
    }
    renderActivities=({item})=>{
        return (
            <View key={item._id} style={styles.slide}>
                <ImageBackground source={{uri:`https://mytinerary-felix.herokuapp.com/${item.photo_activity }` }} style={styles.image}>
                    <Text style={styles.title}>{ item.title }</Text>
                </ImageBackground>
                
            </View>
        );
       }
 
   const info = home ? cities : activities
   const render= home ? _renderItem  :renderActivities

   
        return (
            <Carousel
              data={info}
              renderItem={render}
              sliderWidth={350}
              itemWidth={350}
              
              layout={'default'} 
              loop={true}
              autoplay={true}
            />
        );

}
export default Carrousel

const styles = StyleSheet.create({
    image:{
        overflow: "hidden",
        height:350,
        justifyContent:'flex-end',
        borderRadius:10
 
    },
    title:{
        fontSize:25,
        color:'#efeae4',
        backgroundColor:'rgba(0,0,0,.358)',
        textAlign:'center',
        
    }
})
