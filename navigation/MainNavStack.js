import { createNativeStackNavigator } from '@react-navigation/native-stack'
import City from '../screens/City'
import Cities from '../screens/Cities'
import React from 'react'

const Stack = createNativeStackNavigator()

const CitiesNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name='Cities'
            component={Cities}
            options={{
               headerShown:false
            }}
         />
         <Stack.Screen
            name='City'
            component={City}
            options={{
               headerShown:false
            }}
         />
      </Stack.Navigator>
   )
}

export default CitiesNavigator