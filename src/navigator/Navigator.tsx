import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen, MapScreen, PermissionsScreen } from '../pages';
import { PermissionContext } from '../context/PermissionsContext';

const Stack = createStackNavigator();

const Navigator = () => {

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

export default Navigator