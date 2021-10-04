import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Text}  from 'react-native'
import userActions from '../redux/actions/userActions'
import { showMessage, hideMessage } from "react-native-flash-message";

const LogOut =(props)=>{
    useEffect(()=>{
        props.logOut()
        showMessage({
            message: 'Good Bye! Come back soon!',
            type: "success",
            backgroundColor: "#6b7ae9",
          });
        props.navigation.navigate('Home')
    },[])
    return(
        <>
        </>
    )
}

const mapDispatchToProps = {
    logOut:userActions.logOut
 }
 export default connect(null, mapDispatchToProps)(LogOut)
