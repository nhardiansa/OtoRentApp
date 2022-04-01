import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import SearchResult from '../screens/Search/SearchResult';
import History from '../screens/Payment/History';
import {HOME_SCREEN} from '../helpers/destinationConstants';
import {colors} from '../helpers/styleConstants';
import HomeTab from './HomeTab';

const BottomStack = createBottomTabNavigator();

export default function BottomTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <BottomStack.Navigator
      screenOptions={{
        title: '',
        headerShown: false,
      }}
      initialRouteName={HOME_SCREEN}>
      <BottomStack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <FAIcon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <BottomStack.Screen
        name="Search"
        component={SearchResult}
        options={{
          tabBarIcon: ({color, size}) => (
            <FAIcon name="search" color={color} size={size} />
          ),
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <BottomStack.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({color, size}) => (
            <MAIcon name="note-text-outline" color={color} size={size} />
          ),
          tabBarActiveTintColor: colors.primary,
        }}
      />
    </BottomStack.Navigator>
  );
}
