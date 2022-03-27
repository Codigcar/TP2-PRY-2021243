import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen, PermissionsScreen } from '../pages';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
    initialRouteName="PermissionScreen"
      screenOptions={{
        headerShown:false,
        cardStyle:{
          backgroundColor:'white'
        }
      }}
    >
        <Stack.Screen name="MapScreen" component={MapScreen} ></Stack.Screen>
        <Stack.Screen name="PermissionScreen" component={PermissionsScreen} ></Stack.Screen>
    </Stack.Navigator>
  )
}

export default Navigator