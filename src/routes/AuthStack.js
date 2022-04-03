import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FORGOT_PASSWORD_SCREEN,
  LOGIN_SCREEN,
  REGISTER_SCREEN,
} from '../helpers/destinationConstants';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';

const Auth = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name={LOGIN_SCREEN} component={Login} />
      <Auth.Screen name={REGISTER_SCREEN} component={Register} />
      <Auth.Screen name={FORGOT_PASSWORD_SCREEN} component={ForgotPassword} />
    </Auth.Navigator>
  );
}
