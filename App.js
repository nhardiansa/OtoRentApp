import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ForgotPassword from './src/screens/Auth/ForgotPassword';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import {
  FORGOT_PASSWORD_SCREEN,
  HOME_SCREEN,
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  VIEW_MORE_SCREEN,
} from './src/helpers/destinationConstants';
import Home from './src/screens/Home';
import ViewMore from './src/screens/ViewMore';

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen name={HOME_SCREEN} component={Home} />
        </MainStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
