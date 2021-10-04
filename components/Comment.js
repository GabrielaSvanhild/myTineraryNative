import React, { useEffect, useState }  from "react"
import { Text, StyleSheet, Pressable, View, Image, TextInput } from 'react-native'
import { connect } from "react-redux"


const Comment = (props) => {
    const {user_id,updatedComment,deleteComment,comment,token,stateRender}=props
    const [changeInput, setChangeInput] =useState(false)
    const [commentRender,setCommentRender]=useState(comment.comment)
    const [newComment, setNewComment] = useState({
		"comment": comment.comment
    })
    useEffect(() => {
        setChangeInput(false)
    },[stateRender]) 

    const changeState = () => {
        setChangeInput(!changeInput) 
	}
   
   const buttons_edit_delete=user_id===comment.userId._id&&
   <View style={styles.boxBotones}>
       <Pressable style={styles.boton} onPress={()=>deleteComment(comment._id,token)}><Image style={{width:30, height:30}} source={{uri:"https://i.postimg.cc/14xhcyGV/deleteee.png"}}/></Pressable>
		<Pressable style={styles.boton} onPress={() => changeState()}><Image style={{width:30, height:30}} source={{uri:"https://i.postimg.cc/N0LtcCjM/edit.png"}}/></Pressable>
        
    </View> 
    
    const inputHandler = (e, campo, value) => {
		setNewComment({
			...newComment,
			[campo] : e || value
		})
	}

  return(
    <View style={styles.containComment} >    
         <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
            <Image style={styles.userImage} source={{ uri: comment.userId.src }}/>
            <View>
                <Text style={{ fontSize: 20, color:'#3672cb'}}>{comment.userId.firstName}</Text>
            </View>
        </View>
        <View style={styles.commentBox}>
        {changeInput 
				?
				<View style={styles.commentBox}>
					<TextInput 
						defaultValue={commentRender}
						color='black'
						onChangeText={(e) => inputHandler(e, 'comment')}
                        style={styles.inputComment}
					/>
					<Pressable  style={styles.buttonConfirm}  onPress={() =>{
                       
                         updatedComment(comment._id, newComment.comment ,token)
                         setCommentRender(newComment.comment)

                         }}>
                            <View style={styles.boxButton}>
                                <Text style={{textAlign:'center', color:'white'}}>SEND</Text>
                            </View>                        
                         </Pressable>
                         <Pressable style={styles.buttonConfirm} onPress={() =>{
                     
                        changeState()}}>
                            <View style={styles.boxButton}>
                                <Text style={{textAlign:'center', color:'white'}}>CANCEL</Text>
                            </View>
                        </Pressable>
				</View>
				: 
                <Text style={styles.textComment}>{commentRender}</Text>}
                  {buttons_edit_delete && buttons_edit_delete} 
        </View> 
      
    </View>  
  )
}




const mapStateToProps = (state)=>{
    return{ 
        user_id: state.user._id,
        token:state.user.token
    }
}    
export default connect(mapStateToProps)(Comment)
const styles = StyleSheet.create({
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    commentBox:{
        width: "100%",
        height:120,
        justifyContent:"space-between",
      
    },
    boton:{
        backgroundColor: 'transparent',
        width: 140,
        paddingVertical: 10,
        paddingHorizontal:5,
        borderRadius: 5,
        marginBottom:5,
        alignItems:"flex-end"
    },inputComment:{
        backgroundColor: 'white',
        marginLeft: 70,
        fontSize:18,
    },
    textComment:{
        marginLeft: 70,
        fontSize:18,
           
    },
    containComment:{
        backgroundColor:'#efeae4',
        borderRadius:10,
        borderWidth: 1,
        borderColor: "#6b7ae9",
        marginTop:8,
        paddingVertical:5,
        paddingRight:3  
    },
    boxBotones:{
        width:"100%",
        alignItems:"flex-end"
    },
    buttonConfirm:{
        alignItems:"flex-end"
    },
    boxButton:{
        backgroundColor:'#3ae9cf',
        width:"30%",
        paddingVertical:5,
        borderRadius:5
    }
})