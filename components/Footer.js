import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
const Footer=()=>{
    return(
        <View style={styles.footer}>
            <View style={styles.containerFooter} >
                <View style={styles.boxFooterCall}>
                    <View >
                        <Text>Ready to enjoy?</Text>
                        <Text>Let's get started!</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.boton}>
                            <Text style={styles.textoBoton}>Click here!</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.container2}>
                    <Text style={styles.textFooterTitulo}>MYtinerary</Text>
                    
                    
                </View>
            </View>
           <Text style={styles.textCopyright}> © MindHub 2021 - Gabriela Svanhild Felix</Text>
        </View>
    )

}
export default Footer

const styles=StyleSheet.create({
    footer:{
        backgroundColor: '#434352',
        padding:20
    },
    containerFooter:{
        alignItems:'center'
    },
    boton: {
        backgroundColor: '#6b7ae9',
        width: 90,
        paddingVertical: 10,
        borderRadius: 7,
    },
    textoBoton: {
        textAlign: 'center',
        fontSize:11,
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
    },
    boxFooterCall:{
        flexDirection:'row',
        backgroundColor:"#efeae4",
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        paddingHorizontal: 15,
        borderRadius:5
    },
    container2:{
        flexDirection:'row',
        padding:5,
        width:'100%',
        marginTop:5,
        justifyContent:'center'
    },
    textFooter:{
        color:"#efeae4",
    },textCopyright:{
        color:"#efeae4",
        textAlign:'center',
        marginTop:5
    },
    textFooterTitulo:{
        fontFamily: 'Cinzel_400Regular', 
        color:"#efeae4",
        fontSize:30,
        textAlign:'center'
    }

})