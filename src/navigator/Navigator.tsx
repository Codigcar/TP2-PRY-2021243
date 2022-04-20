import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoadingScreen} from '../pages/LoadingScreen';
import {MapScreen} from '../pages/MapScreen';
import {PermissionsScreen} from '../pages/PermissionsScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccidentsNewsScreen} from '../pages/AccidentsNewsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AccidentsDetailScreen from '../pages/AccidentsDetailScreen';
import {AccidentsFinishedScreen} from '../pages/AccidentsFinishedScreen';
import {Styles} from '../assets/css/Styles';
import MapUserScreen from '../pages/user/MapUserScreen';
import {AccidentsNewsUserScreen} from '../pages/user/AccidentsNewsUserScreen';
import AccidentsDetailUserScreen from '../pages/user/AccidentsDetailUserScreen';
import {Avatar} from 'react-native-elements';
import {StartScreen} from '../pages/auth/StartScreen';
import {RegisterGeneralScreen} from '../pages/auth/RegisterGeneralScreen';
import {RegisterPoliceScreen} from '../pages/auth/RegisterPoliceScreen';
import {LoginScreen} from '../pages/auth/LoginScreen';
import {MainGeneralScreen} from '../pages/auth/MainGeneralScreen';
import {MainPoliceScreen} from '../pages/auth/MainPoliceScreen';

const StackAuth = createStackNavigator();
const Stack = createStackNavigator();
const StackV2 = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const UserTab = createMaterialBottomTabNavigator();

export const Navigator = () => {
  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="AuthNavigator"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {permissions.locationStatus === 'granted' ? (
        // <Stack.Screen
        //   name="PoliceBottomNavigator"
        //   component={PoliceBottomNavigator} />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      ) : (
        // ? <Stack.Screen name="UserBottomNavigator" component={UserBottomNavigator} ></Stack.Screen>
        <Stack.Screen name="PermissionScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <StackAuth.Screen name="Start" component={StartScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterGeneralScreen}></Stack.Screen>
      <Stack.Screen
        name="Registrar Policía"
        component={RegisterPoliceScreen}></Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen
        name="Inicio General"
        component={UserBottomNavigator}></Stack.Screen>
      <Stack.Screen
        name="Inicio Policía"
        component={PoliceBottomNavigator}></Stack.Screen>
    </StackAuth.Navigator>
  );
};

export const PoliceBottomNavigator = () => {
  return (
    <Tab.Navigator
      // activeColor="#f0edf6"
      // inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: Styles.colors.secondary,
      }}
      screenOptions={({route}: any) => ({
        // tabBarActiveTintColor: 'white',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarColor: 'red',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: () => {
          let iconName: string = '';
          switch (route.name) {
            case 'Home':
              iconName = 'navigate';
              break;
            case 'Accidents':
              iconName = 'car-outline';
              break;
            case 'Accidents2':
              iconName = 'list';
              break;
          }

          return (
            <Icon name={iconName} size={25} color={Styles.colors.primary} />
          );
        },
      })}
      sceneAnimationEnabled={true}>
      <Tab.Screen name="Home" options={{title: 'Mapa'}} component={MapScreen} />
      <Tab.Screen
        name="Accidents"
        options={{title: 'Recientes'}}
        component={PoliceStackNavigatorAccNews}
      />
      <Tab.Screen
        name="Accidents2"
        options={{title: 'Atendidos'}}
        component={PoliceStackNavigatorAccFinished}
      />
    </Tab.Navigator>
  );
};

export const PoliceStackNavigatorAccNews = () => {
  return (
    <StackV2.Navigator
      initialRouteName="AccidentsScreen"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: true,
        title: 'Accidentes Recientes',
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 3,
          borderBottomColor: '#e6e6e6',
          backgroundColor: Styles.colors.secondary,
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}>
      <StackV2.Screen
        options={{
          headerRight: () => (
            <Avatar
              rounded
              title="MD"
              overlayContainerStyle={{backgroundColor: Styles.colors.primary}}
              containerStyle={{marginRight: 10}}
            />
          ),
        }}
        name="AccidentsScreen"
        component={AccidentsNewsScreen}
      />
      <StackV2.Screen
        name="AccidentDetailScreen"
        options={{
          headerShown: true,
          title: 'Detalle del Accidente',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 3,
            borderBottomColor: '#e6e6e6',
            backgroundColor: Styles.colors.secondary,
          },
        }}
        component={AccidentsDetailScreen}
      />
    </StackV2.Navigator>
  );
};

export const PoliceStackNavigatorAccFinished = () => {
  return (
    <StackV2.Navigator
      initialRouteName="AccidentsFinishedScreen"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: true,
        title: 'Accidentes Atendidos',
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 3,
          borderBottomColor: '#e6e6e6',
          backgroundColor: Styles.colors.secondary,
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}>
      <StackV2.Screen
        name="AccidentsFinishedScreen"
        component={AccidentsFinishedScreen}
        options={{
          headerRight: () => (
            <Avatar
              rounded
              title="MD"
              overlayContainerStyle={{backgroundColor: Styles.colors.primary}}
              containerStyle={{marginRight: 10}}
            />
          ),
        }}
      />
      <StackV2.Screen
        name="AccidentDetailScreen"
        options={{
          headerShown: true,
          title: 'Detalle del Accidente',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 3,
            borderBottomColor: '#e6e6e6',
            backgroundColor: Styles.colors.secondary,
          },
        }}
        component={AccidentsDetailScreen}
      />
    </StackV2.Navigator>
  );
};

export const UserBottomNavigator = () => {
  return (
    <UserTab.Navigator
      barStyle={{
        backgroundColor: Styles.colors.secondary,
      }}
      screenOptions={({route}: any) => ({
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          borderTopColor: 'red',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: () => {
          //icons
          let iconName: string = '';
          switch (route.name) {
            case 'Home':
              iconName = 'navigate';
              break;
            case 'Accidents':
              iconName = 'list';
              break;
            case 'Accidents2':
              iconName = 'list';
              break;
          }

          return (
            <Icon name={iconName} size={20} color={Styles.colors.primary} />
          );
        },
      })}
      sceneAnimationEnabled={true}>
      <UserTab.Screen
        name="Home"
        options={{title: 'Mapa'}}
        component={MapUserScreen}
      />
      <UserTab.Screen
        name="Accidents"
        options={{title: 'Accidentes'}}
        component={UserStackNavigatorAccNews}
      />
    </UserTab.Navigator>
  );
};

export const UserStackNavigatorAccNews = () => {
  return (
    <StackV2.Navigator
      initialRouteName="AccidentsUserScreen"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: true,
        title: 'Accidentes',
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 3,
          borderBottomColor: '#e6e6e6',
          backgroundColor: Styles.colors.secondary,
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}>
      <StackV2.Screen
        name="AccidentsUserScreen"
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <Avatar
              rounded
              title="MD"
              overlayContainerStyle={{backgroundColor: Styles.colors.primary}}
              containerStyle={{marginRight: 10}}
            />
          ),
        }}
        component={AccidentsNewsUserScreen}
      />
      <StackV2.Screen
        name="AccidentDetailUserScreen"
        options={{
          title: 'Detalle del Accidente',
          headerTintColor: 'white',
          headerRight: () => (
            <Avatar
              rounded
              title="MD"
              overlayContainerStyle={{backgroundColor: Styles.colors.primary}}
              containerStyle={{marginRight: 10}}
            />
          ),
        }}
        component={AccidentsDetailUserScreen}
      />
    </StackV2.Navigator>
  );
};
