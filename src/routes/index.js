import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import UpdateProfile from '../screens/Profile/UpdateProfile';
import Favorites from '../screens/Favorites';
import ViewMore from '../screens/ViewMore';

import BottomTab from './BottomTab';
import {VIEW_MORE_SCREEN} from '../helpers/destinationConstants';

const MainStack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="BottomTab" component={BottomTab} />
        <MainStack.Screen name="UpdateProfile" component={UpdateProfile} />
        <MainStack.Screen name="Favorites" component={Favorites} />
        <MainStack.Screen name={VIEW_MORE_SCREEN} component={ViewMore} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
