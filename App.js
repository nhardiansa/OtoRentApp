import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ForgotPassword from './src/screens/ForgotPassword';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
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

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={LOGIN_SCREEN}
            component={Login}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={REGISTER_SCREEN}
            component={Register}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={FORGOT_PASSWORD_SCREEN}
            component={ForgotPassword}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={HOME_SCREEN}
            component={Home}
          />
          <Stack.Screen name={VIEW_MORE_SCREEN} component={ViewMore} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
