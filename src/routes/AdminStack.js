import React, {useLayoutEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddItem from '../screens/Admin/AddItem';
import {
  ADD_ITEM_SCREEN,
  EDIT_ITEM_SCREEN,
} from '../helpers/destinationConstants';
import UpdateVehicle from '../screens/UpdateVehicle';

const Admin = createNativeStackNavigator();

export default function AdminStack({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Admin.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Admin.Screen name={ADD_ITEM_SCREEN} component={AddItem} />
      <Admin.Screen name={EDIT_ITEM_SCREEN} component={UpdateVehicle} />
    </Admin.Navigator>
  );
}
