import {StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FINISH_PAYMENT,
  GET_PAYMENT_CODE,
  PAYMENT_FORM,
  PAYMENT_DETAIL,
  VEHICLE_DETAIL,
  HOME_SCREEN,
  HISTORY_FILTER,
} from '../helpers/destinationConstants';

import PaymentForm from '../screens/Payment/PaymentForm';
import BackSection from '../components/BackSection';
import GetPaymentCode from '../screens/Payment/GetPaymentCode';
import FinishPayment from '../screens/Payment/FinishPayment';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  clearDataToSend,
  clearTransactionDetail,
} from '../redux/actions/transactionActions';
import DetailTransaction from '../screens/Payment/DetailTransaction';
import {SET_VEHICLE} from '../redux/types/vehicles';
import HistoryFilter from '../screens/Payment/HistoryFilter';

const Payment = createNativeStackNavigator();

export default function PaymentStack({navigation}) {
  const dispatch = useDispatch();
  const {userReducer, transactionReducer} = useSelector(state => state);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (!userReducer.profile) {
      navigation.goBack();
    }

    return () => {
      dispatch(clearDataToSend());
      dispatch(clearTransactionDetail());
      dispatch({
        type: SET_VEHICLE,
        payload: {},
      });
    };
  }, []);

  useEffect(() => {
    if (transactionReducer.details) {
      const {payment} = transactionReducer.details;
      if (Number(payment)) {
        navigation.replace(PAYMENT_DETAIL);
      } else {
        navigation.replace(FINISH_PAYMENT);
      }
    }
  }, [transactionReducer.details]);

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: '#fff',
    },
  });

  return (
    <Payment.Navigator
      screenOptions={{
        title: '',
        headerLeft: () => (
          <BackSection onPress={() => navigation.navigate(HOME_SCREEN)} />
        ),
        headerStyle: styles.headerStyle,
        headerShadowVisible: false,
      }}>
      <Payment.Screen name={PAYMENT_FORM} component={PaymentForm} />
      <Payment.Screen name={GET_PAYMENT_CODE} component={GetPaymentCode} />

      <Payment.Screen name={FINISH_PAYMENT} component={FinishPayment} />
      <Payment.Screen name={PAYMENT_DETAIL} component={DetailTransaction} />
      <Payment.Screen name={HISTORY_FILTER} component={HistoryFilter} />
    </Payment.Navigator>
  );
}
