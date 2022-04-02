import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FINISH_PAYMENT,
  GET_PAYMENT_CODE,
  PAYMENT_FORM,
} from '../helpers/destinationConstants';

import PaymentForm from '../screens/Payment/PaymentForm';
import BackSection from '../components/BackSection';
import GetPaymentCode from '../screens/Payment/GetPaymentCode';
import FinishPayment from '../screens/Payment/FinishPayment';

const Payment = createNativeStackNavigator();

export default function PaymentStack({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
    </Payment.Navigator>
  );
}
