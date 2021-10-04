import React from 'react';
import  { useState } from 'react'
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,TextInput,Keyboard} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions'
import { showMessage, hideMessage } from "react-native-flash-message";
import FontAwesome from "react-native-vector-icons/FontAwesome"

const SignUp=(props)=>{
    const countries = ["Egypt", "Canada", "Australia", "Ireland", "Argentina", "Colombia", "Peru","United States", "Chile", "China", "Japan", "Pakistan", "Colombia", "Uruguay", "Cuba"]
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', src: '', country: '' })
    const handlerInput = (e, campo, value) => {
        setNewUser({
            ...newUser,
            [campo]: e || value
        })
    }
    const submit =()=>{
        let inputs=Object.values(newUser).some((input)=>input==="")
        if(inputs){
            showMessage({
                message: 'Please fill all the fields',
                type: "warning",
                backgroundColor: "#6b7ae9",
              });
             
        }else{
            props.postNewUser(newUser)
            .then(res=>{
                if(res.data && !res.data.success && res.data.errors){
                    res.data.errors.map(error=>{
                    {
                    showMessage({
                        message: error.message,
                        type: "warning",
                        backgroundColor: "red",
                      });
                    }})
                }else if( res.data && !res.data.success){
                    showMessage({
                        message: res.data.error,
                        type: "warning",
                        backgroundColor: "red",
                      });
                    
                }else if(res.data && res.data.success){
                    showMessage({
                        message: 'Cool your username was created successfully',
                        type: "success",
                        backgroundColor: "green",
                      });
                }else{
                    throw new Error()
                }
            })
            .catch(()=>{
                
                  showMessage({
                    message: 'error',
                    type: "warning",
                    backgroundColor: "red",
                  });
            })

        }
    }
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.containerSign}>          
                <ImageBackground style={styles.fondo} source={require('../assets/SignIn.png')}> 
                    <View style={styles.box}>   
                        <Text style={styles.h1}>Create an Account</Text>
                        <TextInput
                    style={styles.input} 
                    placeholder="First Name" 
                    placeholderTextColor= 'white'
                    onChangeText={(e) => handlerInput(e, 'firstName')}
                    
                    />
                    <TextInput
                    style={styles.input} 
                    placeholder="Last Name" 
                    placeholderTextColor= 'white'
                    onChangeText={(e) => handlerInput(e, 'lastName')}
                    />
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
                    secureTextEntry={true}
                    password = {true}
                    onChangeText={(e) => handlerInput(e, 'password')}
                    />
                    <TextInput
                    style={styles.input} 
                    placeholder="Url of your picture" 
                    placeholderTextColor= 'white'
                    onChangeText={(e) => handlerInput(e, 'src')}
                    />

                    <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        handlerInput(selectedItem, 'country')
                    }}
                    defaultButtonText={"Select country"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome name="chevron-down" color={"#FFF"} size={18} />
                      )
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />

                    <TouchableOpacity>
                        <View style={styles.boton}>
                            <Text style={styles.textoBoton} onPress={submit}>SEND</Text>
                        </View>
                    </TouchableOpacity>
                    <View >
                            <Text style={styles.textoFinal}>Already have an account?</Text>
                        </View>
                        <TouchableOpacity
                        onPress={()=>props.navigation.navigate('Sign In')}
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
    postNewUser: userActions.signUp,
   
 }
export default connect(null, mapDispatchToProps)(SignUp)

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
        height: 33,
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
        marginTop:10
    },
    textoBoton: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
    },
    dropdown1BtnStyle: {
        width: 245,
        height: 35,
        backgroundColor: "rgba(0,0,0,.358)",
        borderRadius: 30,
        
        color:"white"
      },
      dropdown1BtnTxtStyle: { color: "white", textAlign: "left" },
      dropdown1DropdownStyle: { backgroundColor: 'rgba(0,0,0,.358)'},
      dropdown1RowStyle: {
        backgroundColor: 'rgba(0,0,0,.358)',
        /* borderBottomColor: "#C5C5C5", */
      },
    dropdown1RowTxtStyle:{ 
          color: "white", textAlign: "left" 
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