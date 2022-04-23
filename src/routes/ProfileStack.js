import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PROFILE_SCREEN, UPDATE_PROFILE
} from '../helpers/destinationConstants';

import ProfileScreen from '../screens/Profile/Profile';
import UpdateProfile from '../screens/Profile/UpdateProfile';

const Profile = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Profile.Navigator screenOptions={{
      headerShown: false,
      headerShadowVisible: false
    }}>
      <Profile.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      <Profile.Screen name={UPDATE_PROFILE} component={UpdateProfile} />
    </Profile.Navigator>
  );
}