import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import UpdateProfile from '../screens/Profile/UpdateProfile';
import Favorites from '../screens/Favorites';

import BottomTab from './BottomTab';
import VehicleDetail from '../screens/VehicleDetail';
import {
  BOTTOM_TAB,
  HISTORY_SCREEN,
  PAYMENT_STACK,
  VEHICLE_DETAIL,
} from '../helpers/destinationConstants';
import PaymentStack from './PaymentStack';
import AuthStack from './AuthStack';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserProfile} from '../redux/actions/userActions';
import History from '../screens/Payment/History';
// import reduxStore from '../redux/store';

const MainStack = createNativeStackNavigator();

// const {persistor, store} = reduxStore();

export default function Routes() {
  const dispatch = useDispatch();
  const {authReducer, userReducer} = useSelector(state => state);

  useEffect(() => {
    // resetStore();
    if (authReducer.user) {
      const {token} = authReducer.user;
      setTokenToStorage(token);

      if (!userReducer.profile) {
        dispatch(setUserProfile(token));
      }
    }
  }, [authReducer]);

  const setTokenToStorage = async token => {
    const savedToken = await AsyncStorage.getItem('token');
    if (!savedToken) {
      await AsyncStorage.setItem('token', token);
    }
  };

  // const resetStore = async () => {
  //   await persistor.purge();
  // };

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {!authReducer.user ? (
          <MainStack.Screen
            name="authStack"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <MainStack.Screen name={BOTTOM_TAB} component={BottomTab} />
            <MainStack.Screen name="Favorites" component={Favorites} />
            <MainStack.Screen name={VEHICLE_DETAIL} component={VehicleDetail} />
            <MainStack.Screen name={PAYMENT_STACK} component={PaymentStack} />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
