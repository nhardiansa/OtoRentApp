import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IOIcon from 'react-native-vector-icons/Ionicons';

import History from '../screens/Payment/History';
import {
  HOME_SCREEN,
  SEARCH_STACK,
  HISTORY_SCREEN,
  PROFILE_STACK,
} from '../helpers/destinationConstants';
import {colors} from '../helpers/styleConstants';
import HomeTab from './HomeTab';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';

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
        tabBarActiveTintColor: colors.primary,
      }}
      initialRouteName={HOME_SCREEN}>
      <BottomStack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <FAIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomStack.Screen
        name={SEARCH_STACK}
        component={SearchStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <FAIcon name="search" color={color} size={size} />
          ),
        }}
      />
      <BottomStack.Screen
        name={HISTORY_SCREEN}
        component={History}
        options={{
          tabBarIcon: ({color, size}) => (
            <MAIcon name="note-text-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomStack.Screen
        name={PROFILE_STACK}
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <IOIcon name="person" color={color} size={size} />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
}
