import axios from 'axios'


const itinerariesActions={
    getAllItineraries:()=>{
        return async (dispatch,getState)=>{
            try{
                let response= await axios.get('https://mytinerary-felix.herokuapp.com/api/itineraries')
                if(!response.data.success){
                    return{success:false, error:"error"}    
                    /* throw new Error('Problems with Back-end') */
                }
                 dispatch({type:"GET_ITINERARIES", payload:response.data.response })
            }catch(e){
                return{success:false, error:e}    

            }
            
        }
    },
    getItinerariesOfOneCity:(id)=>{
        return async (dispatch,getState)=>{
            try{
                let response= await axios.get(`https://mytinerary-felix.herokuapp.com/api/itineraries/${id}`)
                if(!response.data.success){
                    return{success:false, error:"error"}   
                }else{
                    dispatch({type:"GET_ITINERARIES_OF_CITY", payload:response.data.response })
                    return{success:true} 
                }
                    /* throw new Error('Problems with Back-end') */
                
                   
            }catch(e){
                return{success:false, error:e}    

            }
            
        }
    },
    likeDislikeItinerary:(id,token)=>{
        return async (dispatch,getState)=>{
            try{
                let response= await axios.put(
                    `https://mytinerary-felix.herokuapp.com/api/itinerary/like/${id}`,{},
                    {
                        headers: {
                        Authorization: 'Bearer ' + token,
                        },
                    }
                )
              if(response.data.success) return{success:true, response: response.data.response}
              else throw new Error()
            }catch(e){
                return{success:false, error:e}    

            }
        }
    },
    addCommentItinerary:(id,comment,token)=>{
        return async()=>{
            try{
                let response= await axios.put(`https://mytinerary-felix.herokuapp.com/api/itinerary/comments/${id}`,
                {comment, actionType:"addComment"},
                {
                    headers: {
                    Authorization: 'Bearer ' +token,
                    },
                }
                )
                if(response.data.success)  return{success:true, response: response.data.response}
                else throw new Error()
              }catch(e){
                  return{success:false, error:e}    
  
              }
        }
        
    },
    modifyComment:(commentId,comment,token)=>{
        return async()=>{
            try{
                let response= await axios.put(`https://mytinerary-felix.herokuapp.com/api/itinerary/comments/${commentId}`,
                {comment, actionType:"modifyComment"},
                {
                    headers: {
                    Authorization: 'Bearer ' + token,
                    },
                }
                )
                if(response.data.success)  return{success:true, response: response.data.response}
                else throw new Error()
              }catch(e){
                  return{success:false, error:e}    
  
              }
        }
        
    },
    deleteComment:(idComment,token)=>{
        return async(dispatch)=>{
            try{
                let response= await axios.put(`https://mytinerary-felix.herokuapp.com/api/itinerary/comments/${idComment}`,
                { actionType:"deleteComment"},
                {
                    headers: {
                    Authorization: 'Bearer ' + token,
                    },
                }
                )
                if(response.data.success){
                    return{success:true}
                }  
               else{
                throw new Error()  
               } 
              }catch(e){
                  return{success:false, error:e}    
  
              }
        }
        
    },
   




}
export default itinerariesActions