import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';

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

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
      <Toast config={toastConfig} />
    </NavigationContainer>
  )
};

export default App;
