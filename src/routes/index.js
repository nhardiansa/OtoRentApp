import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import UpdateProfile from '../screens/Profile/UpdateProfile';
import Favorites from '../screens/Favorites';

import BottomTab from './BottomTab';
import VehicleDetail from '../screens/VehicleDetail';
import {VEHICLE_DETAIL} from '../helpers/destinationConstants';

const MainStack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="BottomTab" component={BottomTab} />
        <MainStack.Screen name="UpdateProfile" component={UpdateProfile} />
        <MainStack.Screen name="Favorites" component={Favorites} />
        <MainStack.Screen name={VEHICLE_DETAIL} component={VehicleDetail} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}