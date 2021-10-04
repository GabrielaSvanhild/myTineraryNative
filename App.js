import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers/rootReducer'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './navigation/MainNavDrawer'
import FlashMessage from "react-native-flash-message"
import {useFonts,Cinzel_400Regular,Cinzel_700Bold } from '@expo-google-fonts/cinzel'
import { NixieOne_400Regular } from '@expo-google-fonts/nixie-one'
import { Asap_400Regular,Asap_700Bold} from '@expo-google-fonts/asap'
import AppLoading from 'expo-app-loading'
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs(true)

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  let [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    NixieOne_400Regular,
    Asap_400Regular,
    Asap_700Bold
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
      <Provider store={globalStore}>
        <View style={styles.container}>
          <NavigationContainer>
            <Navigator />
            <FlashMessage  floating={true}  statusBarHeight="78" icon="auto"/> 
          </NavigationContainer>
          
        </View>
    </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeae4',
   
  },
  texto:{
    fontSize:70,
   
  },

  
});
