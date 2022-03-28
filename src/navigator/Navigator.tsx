import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionContext } from '../context/PermissionsContext';
import { LoadingScreen } from '../pages/LoadingScreen';
import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { permissions } = useContext(PermissionContext);

  if (permissions.localStatus === 'unavailable') {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      initialRouteName="PermissionScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (permissions.localStatus === 'granted')
        ? <Stack.Screen name="MapScreen" component={MapScreen} ></Stack.Screen>
        : <Stack.Screen name="PermissionScreen" component={PermissionsScreen} ></Stack.Screen>
      }
    </Stack.Navigator>
  )
}
