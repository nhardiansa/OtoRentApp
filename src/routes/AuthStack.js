import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FORGOT_PASSWORD_SCREEN,
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  VERIFY_USER_SCREEN,
} from '../helpers/destinationConstants';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import VerifyUser from '../screens/Auth/VerifyUser';

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
      <Auth.Screen name={VERIFY_USER_SCREEN} component={VerifyUser} />
    </Auth.Navigator>
  );
}
