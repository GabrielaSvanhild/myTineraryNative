import React,{useState} from 'react';
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,TouchableWithoutFeedback ,TextInput,Keyboard} from 'react-native';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions'
import { showMessage, hideMessage } from "react-native-flash-message";

const SignIn=(props)=>{
    const [user, setUser] = useState({  email: '', password: ''})
    const handlerInput = (e, campo, value) => {
        setUser({
            ...user,
           [campo]: e 
        })
    }

    const submit =()=>{
        let inputs=Object.values(user).some((input)=>input==="")
        if(inputs){
            showMessage({
                message: 'Please fill all the fields',
                type: "warning",
                backgroundColor: "#6b7ae9",
              });
        }else{
            props.logUser(user)
            .then((res)=>{
                if(res.data && !res.data.success){
                    showMessage({
                        message: res.data.error,
                        type: "warning",
                        backgroundColor: "red",
                      });
                }else if(res.data && res.data.success){
                    showMessage({
                        message: 'Welcome Back!',
                        type: "success",
                        backgroundColor: "green",
                      });
                }else{
                    showMessage({
                        message: "Sorry we have technical problems, come back soon!",
                        type: "warning",
                        backgroundColor: "red",
                      });
                }
                    
              
            })
            .catch(e=>console.log(e))
        }
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.containerSign}>           
                <ImageBackground style={styles.fondo} source={require('../assets/SignIn.png')}> 
                    <View style={styles.box}>   
                        <Text style={styles.h1}>Welcome Back!</Text>                  
                        <TextInput
                        style={styles.input} 
                        placeholder="Email" 
                        placeholderTextColor= 'white'
                        onChangeText={(e) => handlerInput(e, 'email')}
                        />
                        <TextInput
                        style={styles.input} 
                        placeholder="Password" 
                        placeholderTextColor= 'white'
                        onChangeText={(e) => handlerInput(e, 'password')}
                        secureTextEntry={true}
                        password = {true}
                        />                   
                    <TouchableOpacity
                    onPress={submit}
                    >
                        <View style={styles.boton}>
                            <Text style={styles.textoBoton} >SEND</Text>
                        </View>
                    </TouchableOpacity>
                        <View >
                            <Text style={styles.textoFinal}>Don't have an account?</Text>
                        </View>
                        <TouchableOpacity
                        onPress={()=>props.navigation.navigate('Sign Up')}
                        >
                        <View style={styles.boton2}>
                            <Text style={styles.textoBoton} >Click</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </ImageBackground>            
            </View>
        </TouchableWithoutFeedback>
        
    )
   

}
const mapDispatchToProps = {
    logUser: userActions.signIn,  
 }

export default connect(null, mapDispatchToProps)(SignIn) 

const styles= StyleSheet.create({
    h1:{
        fontSize: 30,
        color: 'white',
    },
    containerSign:{
        alignItems:'center',
        justifyContent:'space-around',
    },
    fondo:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
        input: {
        height: 40,
        color: 'white',
        fontSize: 15,
        backgroundColor:'rgba(0,0,0,.358)',
        width: '60%',
        textAlign: 'center',
        marginVertical:10,
        borderRadius:25
    },
    box:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,.358)',
        alignItems:'center',
        justifyContent:'center'
        /* hsla(0,0%,100%,.296) */
    },
    boton: {
        backgroundColor: '#6b7ae9',
        width: 140,
        paddingVertical: 10,
        borderRadius: 5,
    },
    textoBoton: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
    },
    textoFinal:{
        marginTop:10,
        color: 'white',
        fontWeight: 'bold',
    },
    boton2:{
        backgroundColor: '#6b7ae9',
        width: 70 ,
        paddingVertical: 5,
        borderRadius: 5,
    }
   
})