import {} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Box, Divider, ScrollView, Text, useToast} from 'native-base';
import Stepper from '../../components/Stepper';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import CustomButton from '../../components/CustomButton';
import {capitalize, priceFormat} from '../../helpers/formatter';
import BackSection from '../../components/BackSection';
import {useDispatch, useSelector} from 'react-redux';
import {axiosInstance} from '../../helpers/http';
import moment from 'moment';
import {
  BOTTOM_TAB,
  HISTORY_SCREEN,
  PAYMENT_DETAIL,
} from '../../helpers/destinationConstants';
import {payTransaction} from '../../redux/actions/transactionActions';

export default function FinishPayment({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <BackSection
          onPress={() =>
            navigation.navigate(BOTTOM_TAB, {
              screen: HISTORY_SCREEN,
            })
          }
        />
      ),
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const {transactionReducer, authReducer, vehiclesReducer} = useSelector(state => state);
  const {
    payment_code,
    start_rent,
    end_rent,
    qty,
    total_paid: totalPaid,
    prepayment,
    // vehicle_id: vehicleId,
    id: transactionId,
    payment: paymentStatus,
  } = transactionReducer.details;
  const {token} = authReducer.user;
  const vehicleDetails = vehiclesReducer.vehicle;
  const {loading: isLoading, error} = transactionReducer;

  const toast = useToast();
  // const [vehicleDetails, setVehicleDetails] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState('');

  useEffect(() => {
    if (!transactionReducer.details) {
      navigation.goBack();
      return;
    }

    if (Number(transactionReducer.details.payment)) {
      navigation.navigate(PAYMENT_DETAIL);
    }
  }, [transactionReducer.details]);

  useEffect(() => {
    if (error) {
      toast.show({
        description: error,
        title: 'Error',
        duration: 3000,
        placement: 'top',
        status: 'error',
      });
    }
  }, [error]);

  // useEffect(() => {
  //   console.log('vehicleDetails', vehicleDetails);

  //   if (Object.keys(vehicleDetails).length < 1) {
  //     getVehicleDetails();
  //   }
  // }, [vehicleDetails]);

  // const getVehicleDetails = async () => {
  //   try {
  //     const {data} = await axiosInstance().get(`/vehicles/${vehicleId}`);

  //     if (!data.status) {
  //       setError(data.message);
  //       setIsLoading(false);
  //       return;
  //     }

  //     setVehicleDetails(data.results);
  //     setIsLoading(false);
  //   } catch (err) {
  //     if (err.response) {
  //       console.error(err.response);
  //       toast.show({
  //         description: err.response.data.message,
  //         title: 'Error',
  //         duration: 3000,
  //         placement: 'top',
  //         status: 'error',
  //       });
  //       setError(err.response.data.message);
  //     } else {
  //       console.error(err);
  //       toast.show({
  //         description: err.message,
  //         duration: 3000,
  //         title: 'Error',
  //         placement: 'top',
  //         status: 'error',
  //       });
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   }
  // };

  const finishPaymentHandler = () => {
    dispatch(payTransaction(transactionId, token));
  };

  return (
    <>
      {isLoading ? (
        <Box flex={1} justifyContent="center">
          <Text
            fontFamily={fontStyle(fontFamily.primary, 'bold')}
            fontSize="2xl"
            color="gray.400"
            textAlign="center">
            {isLoading && !error ? 'Loading...' : error}
          </Text>
        </Box>
      ) : (
        <ScrollView>
          <Box
            px="5"
            pb="12"
            pt="12"
            flex={1}
            backgroundColor="white"
            alignItems="center">
            <Stepper count={3} currentlyActive={3} mb="9" />

            <Text
              fontSize="lg"
              fontFamily={fontStyle(fontFamily.primary, 'bold')}
              color={colors.grayDark}>
              Payment Code
            </Text>
            <Text
              mt="2"
              fontSize="3xl"
              fontFamily={fontStyle(fontFamily.primary, 'bold')}>
              {payment_code}
            </Text>
            <Text
              mt="3"
              textAlign="center"
              w="5/6"
              fontSize="sm"
              fontFamily={fontStyle(fontFamily.primary)}
              color={colors.grayDark}>
              Insert your payment code while you transfer booking order
            </Text>

            <Text
              mt="7"
              fontSize="md"
              fontFamily={fontStyle(fontFamily.primary)}
              color={colors.grayDark}>
              Bank account information :
            </Text>
            <Text
              mt="2"
              fontSize="2xl"
              fontFamily={fontStyle(fontFamily.primary, 'bold')}>
              0290-90203-345-2
            </Text>
            <Text
              fontSize="md"
              mt="1"
              fontFamily={fontStyle(fontFamily.primary, 'bold')}
              color={colors.grayDark}>
              PT. Oto Rent
            </Text>
            <Divider mt="4" mb="7" />
            <Text
              lineHeight="lg"
              fontSize="md"
              fontFamily={fontStyle(fontFamily.primary)}>
              Booking code :{' '}
            </Text>
            <Text
              fontFamily={fontStyle(fontFamily.primary, 'bold')}
              color="green.700"
              mb="4">
              {payment_code}
            </Text>

            <Text
              mb="4"
              fontSize="sm"
              fontFamily={fontStyle(fontFamily.primary)}>
              Use booking code to pick up your vehicle
            </Text>
            <Box w="5/6">
              <CustomButton>Copy Payment & Booking Code</CustomButton>
            </Box>
            <Text
              mt="10"
              mb="7"
              alignSelf="flex-start"
              fontSize="md"
              fontFamily={fontStyle(fontFamily.primary)}>
              Order details : {'\n'}
              {qty} {capitalize(vehicleDetails.name)}{' '}
              {'\n'}
              {prepayment
                ? `Prepayment ${priceFormat(prepayment)}`
                : 'No Prepayment'}
              {'\n'}
              {(Date.parse(end_rent) - Date.parse(start_rent)) /
                (1000 * 60 * 60 * 24)}{' '}
              {
                ((Date.parse(end_rent) - Date.parse(start_rent)) / (1000 * 60 * 60 * 24)) > 1 ? 'days' : 'day'
              } {'\n'}
              {moment(start_rent).format('MMM DD') +
                ' to ' +
                moment(end_rent).format('MMM DD YYYY')}
            </Text>
            <Divider mb="7" />
            <Text
              mb="5"
              fontSize="4xl"
              alignSelf="flex-start"
              fontFamily={fontStyle(fontFamily.primary, 'bold')}>
              Rp {priceFormat(totalPaid)}
            </Text>
            {!Number(paymentStatus) && (
              <Box w="full">
                <CustomButton onPress={finishPaymentHandler}>
                  Finish Payment
                </CustomButton>
              </Box>
            )}
          </Box>
        </ScrollView>
      )}
    </>
  );
}
