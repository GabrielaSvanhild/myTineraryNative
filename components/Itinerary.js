import React, { useEffect, useState,useRef } from "react"
import { Text, StyleSheet, Pressable, ImageBackground, View, TextInput, Image,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import activityActions from "../redux/actions/activityActions"
import itinerariesActions from "../redux/actions/itinerariesActions" 
import Comments from "./Comments" 
import { showMessage, hideMessage } from "react-native-flash-message";
import Carrousel from "./Carrousel";

const Itinerary = (props) => {
const { itinerary, getActivityOfItinerary,fetcheo,setFetcheo } = props
  const [comments, setComments] = useState(itinerary.comments)
  const [activities, setActivities] = useState([])
  const [numberLikes, setNumberlikes]=useState(itinerary.likes)
	const [inputComment, setInputComment]=useState({comment:""})
	const [view,setView] =useState(false)
	let money=[]

	for(let i = 0; i < itinerary.price; i++){
		money.push("https://i.postimg.cc/YCdfY5S3/plata2.png")
	} 
	
	const placeholder_input= props.token_store ? "Write a Comment" : "Only comment if you logged"
	const changeButton=()=>{
		setView(!view) 
 }

  useEffect(() => {
    getActivityOfItinerary(itinerary._id)
	  .then((res) => setActivities(res.response))
	  .catch((error) => (console.log(error)))
  },[props.itinerary._id]) 

  let condition = numberLikes.includes(props._id) ? "💜" : "🤍" 

  const like_dislike_click=() =>{
    if(!props.token_store){
		showMessage({
			message: 'You have to log in to like',
			type: "warning",
			backgroundColor: "#6b7ae9",
		  });
    }else{
         props.likeDislikeItinerary(itinerary._id,props.token_store)
        .then(res=>{
						setNumberlikes(res.response.likes)
						setFetcheo(!fetcheo)
        })  
        .catch(error=> console.log(error))
    }     
}
  const  inputHandler= (e,campo,value)=>{
    setInputComment({
        ...inputComment,
        [campo]:e || value
    })
  }
  
const addComment =(e)=>{
	if(!props.token_store){
		showMessage({
			message: 'You have to be logged to comment',
			type: "warning",
			backgroundColor: "#6b7ae9",
		  });

	}else{
		if(inputComment.comment.length===0){
			showMessage({
				message: 'You must write something',
				type: "warning",
				backgroundColor: "#6b7ae9",
			  });
		}else{
			props.postComment(itinerary._id, inputComment.comment ,props.token_store)
			.then(res=>{
			setInputComment({comment:""})
			setComments(res.response)})
			.catch(error=>console.log(error))     
		}
		
	}
        
}

  return(
    <>
        <View style={styles.containAll}>
			<View style={styles.containItinerary}>
				<ImageBackground resizeMode="cover" source={{uri: `https://mytinerary-felix.herokuapp.com/${itinerary.photo_itinerary}` }} style={styles.imageHeader}>
					
				</ImageBackground>
				<View>
					<View style={styles.profileAndLike}>
						<View style={styles.profile}>
							<Image resizeMode="cover" source={{uri: `https://mytinerary-felix.herokuapp.com/${itinerary.photo_author}`}} style={styles.imageProfile}/>
							<Text style={styles.autorName}>{itinerary.name_author}</Text>
						</View>
						<View style={styles.likes}>

							<Text style={styles.heart}onPress={()=>like_dislike_click()}> {condition} {numberLikes.length}</Text>
						</View>
					</View>
					<View style={styles.containTitle}>
						<Text style={styles.title}>{itinerary.title}</Text>
						<Text style={styles.subtitle}>{itinerary.description}</Text>
					</View>
					<View style={styles.price}>
						<View style={styles.containClock}>
              <Image style={styles.clock}  source={{uri:'https://i.postimg.cc/t4pVr2cM/wall-clock.png'}}/>
							<Text style={styles.textHora} >{itinerary.duration} Hours</Text>
						</View>
                        
						<View style={styles.containMoney}>
                            {/* <Image/> */}
							<Text style={styles.textMoney}>Price :</Text>
							{money.map(photo=>{
								return(
									<Image style={styles.moneyPhoto}  source={{uri:photo}}/>
								)
							})}
							
						</View>
						<View style={styles.containHastags}>
						{itinerary.hashtag.map((hasht) => <Text style={styles.hashtagText}>{hasht}</Text>)}
					</View>
					</View>
				</View>
				<View>
					{
						view &&<View>
							<View style={styles.boxCenter}>
								<View style={styles.boxTextActivities}>
									<Text style={styles.textActivities}>Activities</Text>
								</View>
							</View>
							
								<Carrousel  home={false} activities={activities}/>
							<View>
									<View style={styles.containComments}>
											<ScrollView style={styles.comments}>
													<Comments itinerary={itinerary._id} comments={comments} setComments={setComments}/>
											</ScrollView> 
											<View style={styles.containInput}>	
													<TextInput
													placeholder={placeholder_input}
													placeholderTextColor='#333333'
													color='black'
													style={styles.inputComment}
													onChangeText={(e)=>inputHandler(e,"comment")} 
													value={inputComment.comment}
													/>
													<Pressable onPress={()=>addComment() }>
														<Image esizeMode="cover" source={{uri: "https://i.postimg.cc/nzxjNMs1/send.png"}} style={styles.imageSend}/>
													</Pressable>
											</View>	
									</View> 
							</View>
					</View>	
					}
					
                    
					<View style={styles.button}>
					<Pressable
					  onPress={changeButton}>
						<Text style={{ color: '#55c4d8', fontSize: 20, textAlign: 'center', textDecorationLine: 'underline' }}>{!view ? "View More" : "View Less" }</Text>
					</Pressable>
					</View>
				</View>
			</View>
		</View>
		
    </>  
  )
}


const mapStateToProps = (state)=>{
    return{ 
        token_store: state.user.token,
        _id: state.user._id
    }
}    
const mapDispatchToProps = {
    likeDislikeItinerary: itinerariesActions.likeDislikeItinerary, 
    getActivityOfItinerary: activityActions.getActivityOfItinerary, 
    postComment:itinerariesActions.addCommentItinerary,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)

const styles = StyleSheet.create({
	containAll:{
		width: "100%",
		alignItems: "center",
		padding: 5,
		paddingBottom: 25,
	
	},
	imageHeader:{
		height: 300,
		width: "100%",
		alignItems: "center",
		overflow: "hidden",
		borderBottomLeftRadius:  20,
		borderBottomRightRadius:  20,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
		width: 5,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
		
	},
	containItinerary:{
		width: "95%",
		justifyContent: "center",
		padding: 20,
		backgroundColor: 'rgba(255, 255, 255, 1)',
		borderRadius:10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	containHastags:{
		flexDirection: "row",
		padding: 17,
		width: "100%",
		justifyContent: "space-between",
		borderRadius:5,
		borderWidth: 1,
		borderColor: "#6b7ae99f",
		marginBottom:10

	},
	carouselActivity:{
		height: 350,
		width: 300
	},
	profileAndLike:{
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 4,
		alignItems: "center"
	},
	imageProfile:{
		height: 60,
		width: 60,
		borderRadius:70
	},
	imageSend:{
		height: 38,
		width: 38,
		marginLeft: 10
	},
	profile:{
		flexDirection: "row",
		alignItems: "center",
	},
	autorName:{
		marginLeft: 10,
		fontSize:21
	},
	containTitle:{
		width: "100%",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 5,
		paddingBottom: 5,
		borderRadius:5,
		borderWidth: 1,
		borderColor: "#6b7ae99f",
		backgroundColor: '#6b7ae99f',
		paddingTop:30,
		paddingBottom:30
	},
	title:{
		fontSize: 30,
		textAlign: "center",
		color:"white",
		fontWeight:"bold"
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		color:"white"
	},
	inputComment: {
		backgroundColor: '#6b7ae99f',
		width: '85%',
		borderRadius: 5,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
		fontSize: 20
	},
	containInput: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	containComments:{
		padding: 5,
		paddingTop: 15,
		marginTop:10,
		width:350,
		paddingBottom: 15,
		shadowColor: "#000",
		shadowOffset: {
		width: 1,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 1.41,
		elevation: 1.5,
		borderBottomLeftRadius:  5,
        borderBottomRightRadius:  5,
        backgroundColor:"#efeae4"
	},
	imageActivity:{
		height: 350,
		width: 350,
		marginLeft: 10
	},
	textActivities:{
		fontSize:30,
		textAlign:"center",
		color:"white",
		
	},
	boxTextActivities:{
		backgroundColor: '#6b7ae99f',
		width:200,
		borderRadius:10,
	

	},boxCenter:{
		alignItems:"center",
		marginVertical:10
	},
	hashtagText:{
		color:'black',
		fontSize:15
	},
	heart:{
		fontSize:20
	},
	clock:{
		width:32,
		height:32
	},
	containClock:{
		flexDirection:"row",
		alignItems:'center',
		padding: 12,
		borderRadius:5,
		borderWidth: 1,
    borderColor: "#6b7ae99f",
	},
	textHora:{
		fontSize:20,
		
	},
	moneyPhoto:{
		width:25,
		height:25,
		marginRight:3
	},
	containMoney:{
		flexDirection:'row',
		alignItems:'center',
		padding: 15,
		borderRadius:5,
		borderWidth: 1,
		borderColor: "#6b7ae99f",
		marginVertical:10
	},
	textMoney:{
		fontSize:20
	}
	
})
