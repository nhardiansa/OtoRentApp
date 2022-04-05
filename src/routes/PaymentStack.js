import {StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FINISH_PAYMENT,
  GET_PAYMENT_CODE,
  PAYMENT_FORM,
  PAYMENT_DETAIL,
} from '../helpers/destinationConstants';

import PaymentForm from '../screens/Payment/PaymentForm';
import BackSection from '../components/BackSection';
import GetPaymentCode from '../screens/Payment/GetPaymentCode';
import FinishPayment from '../screens/Payment/FinishPayment';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {clearDataToSend} from '../redux/actions/transactionActions';
import DetailTransaction from '../screens/Payment/DetailTransaction';

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
    };
  }, []);

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: '#fff',
    },
  });

  return (
    <Payment.Navigator
      screenOptions={{
        title: '',
        headerLeft: () => <BackSection onPress={() => navigation.goBack()} />,
        headerStyle: styles.headerStyle,
        headerShadowVisible: false,
      }}>
      <Payment.Screen name={PAYMENT_FORM} component={PaymentForm} />
      <Payment.Screen name={GET_PAYMENT_CODE} component={GetPaymentCode} />
      <Payment.Screen name={FINISH_PAYMENT} component={FinishPayment} />
      <Payment.Screen name={PAYMENT_DETAIL} component={DetailTransaction} />
    </Payment.Navigator>
  );
}
