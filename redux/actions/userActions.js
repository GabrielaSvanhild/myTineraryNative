import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const userActions={
    signIn: (user)=>{
        return async(dispatch,getState)=>{
           try{
                let response = await axios.post('https://mytinerary-felix.herokuapp.com/api/user/signin',{...user})
                if(response.data.success){
                    await AsyncStorage.setItem('token', response.data.response.token)
                    await AsyncStorage.setItem('firstName', response.data.response.firstName)
                    await AsyncStorage.setItem('src', response.data.response.src)
                    await AsyncStorage.setItem('_id', response.data.response._id)
                    dispatch({type:'LOG_IN', payload: response.data.response})             
                }
                return response
           }catch(e){
                return({success:false, error:e})
           }
        }
    },
    
    signUp:(newUser)=>{
        return async(dispatch,getState)=>{
            try{
                let response= await axios.post('https://mytinerary-felix.herokuapp.com/api/user/signup',{...newUser})
                if (response.data.success){
                    await AsyncStorage.setItem('token', response.data.response.token)
                    await AsyncStorage.setItem('firstName', response.data.response.firstName)
                    await AsyncStorage.setItem('src', response.data.response.src)
                    await AsyncStorage.setItem('_id', response.data.response._id)
                    dispatch({type:'LOG_IN', payload: response.data.response}) 
                }
                return response
            }catch(e){
                return({success:false, error:e})
            }  
        }
    },

    logOut: () => {
        return async (dispatch, getState) => {
            await AsyncStorage.clear()
           dispatch({ type: 'LOG_OUT' })
        }
     },

     logAsyncStorage: (token) => {
        return async (dispatch, getState) => {
           try {
              let response = await axios.get(
                 'https://mytinerary-felix.herokuapp.com/api/users/validation',
                 {
                    headers: {
                       Authorization: 'Bearer ' + token,
                    },
                 }
              )
              dispatch({
                 type: 'LOG_IN',
                 payload: {
                    token,
                    firstName: response.data.firstName,
                    src: response.data.src,
                    _id: response.data._id
                 },
              })
           } catch (error) {
              return dispatch({ type: 'LOG_OUT' })
           }
        }
     },
     
     

}
export default userActions
