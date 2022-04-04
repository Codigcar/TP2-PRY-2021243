import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';
import { LoginScreen } from './src/pages/LoginScreen';
import { StartScreen } from './src/pages/StartScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterGeneralScreen } from './src/pages/RegisterGeneralScreen';
import { RegisterPoliceScreen } from './src/pages/RegisterPoliceScreen';

LogBox.ignoreAllLogs
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);



const AppState = ({ children }: any) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <AppState>
        <Navigator />
      </AppState>
      <Toast config={toastConfig} /> */}
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={RegisterGeneralScreen}></Stack.Screen>
        <Stack.Screen name="RegisterPolicia" component={RegisterPoliceScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
