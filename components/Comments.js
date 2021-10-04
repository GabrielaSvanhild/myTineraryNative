import React, { useEffect, useState }  from "react"
import { Text, StyleSheet, Pressable, ImageBackground, View, ScrollView } from 'react-native'
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions" 
import Comment from "./Comment"

const Comments = (props) => {
    const {modifyComment,deleteComment, setComments, comments}=props
    const [render, setRender] =useState(false)

    const confirmDeleteComment=async(idComment,token)=>{
        try{
            let response = await deleteComment( idComment, token)
            if(response.success) setComments(comments.filter(comment=>comment._id!==idComment))
            else throw new Error()

        }catch(e){
            console.log(e)
        } 
    }
   

    const editComment= (commentId, comment, token) =>{
        modifyComment(commentId, comment, token)
        .then((res) => {
            if(res.success){
                comments.forEach((each_comment) =>{
                    if(each_comment._id === commentId){
                        comment.comment=each_comment
                    }
                })
                setComments(comments)
                setRender(!render)
            }
        })
        .catch((error) => console.log(error))
    }
  return(
    <>
        <View>
            <ScrollView style={styles.containComments} vertical={true}>
                {comments.map(comment =>{
                    return(
                        <Comment 
                        key={comment._id}
                        updatedComment={editComment}
                        deleteComment={confirmDeleteComment}
                        comment={comment}
                        stateRender={render}
                        />
                    )
                })}
            </ScrollView>
        </View>
    </>  
  )
}

const mapDispatchToProps = {
    deleteComment: itinerariesActions.deleteComment,
    modifyComment : itinerariesActions.modifyComment
}    

export default connect(null, mapDispatchToProps)(Comments)

const styles = StyleSheet.create({
    containComments:{
        height: 480,
        padding: 15,
    }
})