import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_SCREEN, VIEW_MORE_SCREEN} from '../helpers/destinationConstants';
import ViewMore from '../screens/ViewMore';
import Home from '../screens/Home';

const HomeTabStack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <HomeTabStack.Navigator
      screenOptions={{
        title: '',
        headerShown: false,
      }}>
      <HomeTabStack.Screen name={HOME_SCREEN} component={Home} />
      <HomeTabStack.Screen name={VIEW_MORE_SCREEN} component={ViewMore} />
    </HomeTabStack.Navigator>
  );
}
