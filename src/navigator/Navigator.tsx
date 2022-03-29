import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../pages/LoadingScreen';
import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccidentsScreen } from '../pages/AccidentsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AccidentsDetailScreen from '../pages/AccidentsDetailScreen';

const Stack = createStackNavigator();
const StackV2 = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export const Navigator = () => {
  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
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
        (permissions.locationStatus === 'granted')
          ? <Stack.Screen name="MapScreen" component={BottomNavigator} ></Stack.Screen>
          : <Stack.Screen name="PermissionScreen" component={PermissionsScreen} ></Stack.Screen>
      }
    </Stack.Navigator>
  )
}

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          borderTopColor: 'red',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12
        },
        tabBarIcon: ({ color, focused }) => {  //icons

          let iconName: string = '';

          switch (route.name) {
            case 'Home':
              iconName = 'navigate'
              break;
            case 'Accidents':
              iconName = 'list'
              break;
            case 'Accidents2':
              iconName = 'list'
              break;
          }

          return <Icon name={iconName} size={20} color={'red'} />
        }
      })}
      barStyle={{
        backgroundColor: 'white'
      }}
      sceneAnimationEnabled={true}
    >
      <Tab.Screen name="Home" options={{ title: 'Mapa' }} component={MapScreen} />
      <Tab.Screen name="Accidents" options={{ title: 'Recientes' }} component={StackNavigatorV2} />
      <Tab.Screen name="Accidents2" options={{ title: 'Atendidos' }} component={AccidentsDetailScreen} />
    </Tab.Navigator>
  );
}

export const StackNavigatorV2 = () => {

  return (
    <StackV2.Navigator
      initialRouteName="AccidentsScreen"
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <StackV2.Screen name="AccidentsScreen" component={AccidentsScreen} />
      <StackV2.Screen name="AccidentDetail" component={AccidentsDetailScreen} />
    </StackV2.Navigator>
  )
}