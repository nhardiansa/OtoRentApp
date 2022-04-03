import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import UpdateProfile from '../screens/Profile/UpdateProfile';
import Favorites from '../screens/Favorites';

import BottomTab from './BottomTab';
import VehicleDetail from '../screens/VehicleDetail';
import {PAYMENT_STACK, VEHICLE_DETAIL} from '../helpers/destinationConstants';
import PaymentStack from './PaymentStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
// import reduxStore from '../redux/store';

const MainStack = createNativeStackNavigator();

// const {persistor, store} = reduxStore();

export default function Routes() {
  const {authReducer} = useSelector(state => state);

  useEffect(() => {
    console.log('authReducer routes', authReducer);
    // resetStore();
  }, []);

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
            <MainStack.Screen name="BottomTab" component={BottomTab} />
            <MainStack.Screen name="UpdateProfile" component={UpdateProfile} />
            <MainStack.Screen name="Favorites" component={Favorites} />
            <MainStack.Screen name={VEHICLE_DETAIL} component={VehicleDetail} />
            <MainStack.Screen name={PAYMENT_STACK} component={PaymentStack} />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
