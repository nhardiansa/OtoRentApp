import {} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Box,
  Button,
  Divider,
  Image,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import BackSection from '../../components/BackSection';
import {BOTTOM_TAB, HISTORY_SCREEN} from '../../helpers/destinationConstants';
import {
  MOTORBIKE_PLACEHOLDER,
  BIKE_PLACEHOLDER,
  CAR_PLACEHOLDER,
} from '../../assets/images';
import {capitalize, normalizeUrl, priceFormat} from '../../helpers/formatter';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import moment from 'moment';
import LoadingScreen from '../../components/LoadingScreen';
import {
  clearTransactionError,
  vehicleIsReturned,
} from '../../redux/actions/transactionActions';
import {axiosInstance} from '../../helpers/http';
import qs from 'query-string';

export default function DetailTransaction({navigation}) {
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

  const toast = useToast();

  const dispatch = useDispatch();
  const {transactionReducer, vehiclesReducer, userReducer, authReducer} =
    useSelector(state => state);
  const {token} = authReducer.user;
  const {image: vehicleImage, name: vehicleName} = vehiclesReducer.vehicle;
  const {loading: trxLoading, error: trxError} = transactionReducer;
  const {
    payment_code,
    start_rent,
    end_rent,
    qty,
    total_paid: totalPaid,
    prepayment,
    vehicle_id: vehicleId,
    id: transactionId,
    returned: isReturned,
    // payment: paymentStatus,
  } = transactionReducer.details;
  // const {name: userName, email, phone, address} = userReducer.profile;
  const {name: userName, email, phone, role} = userReducer.profile;

  const [placeHolder, setPlaceHolder] = useState(CAR_PLACEHOLDER);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (trxError) {
      dispatch(clearTransactionError());
    }
  }, []);

  useEffect(() => {
    if (!transactionReducer.details) {
      navigation.goBack();
      return;
    }

    if (!vehiclesReducer.vehicle.id) {
      navigation.goBack();
    }

    if (vehiclesReducer.vehicle.id) {
      const type = vehiclesReducer.vehicle.category_name;
      if (type === 'motorbike') {
        console.log(type);
        setPlaceHolder(MOTORBIKE_PLACEHOLDER);
      }
    }

    console.log(transactionReducer, vehiclesReducer);
  }, [transactionReducer, vehicleId, navigation, vehiclesReducer]);

  const setIsReturned = async () => {
    dispatch(vehicleIsReturned(transactionId, token));
  };

  return (
    <>
      {trxLoading || isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <Box px="5" flex={1} bgColor="white" pt="5">
            <Box>
              <Text
                fontSize="3xl"
                textAlign="center"
                color={colors.green}
                fontFamily={fontStyle(fontFamily.primary, 'bold')}>
                {Number(isReturned) ? 'Has been returned' : 'Payment success'}
              </Text>

              <Image
                mt="9"
                source={vehicleImage ? normalizeUrl(vehicleImage) : placeHolder}
                alt={vehicleName}
                w="full"
                h={56}
                rounded="xl"
              />
            </Box>
            <Box mt="7">
              <Text
                fontSize="xl"
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                textAlign="center">
                Booking Code: {'\n'}
                <Text color={colors.green}>{payment_code}</Text>
              </Text>
            </Box>
            <Box mt="9">
              <Text
                color="gray.500"
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {qty + ' ' + capitalize(vehicleName)}
              </Text>
              <Text
                mt="3"
                color="gray.500"
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {prepayment ? priceFormat(prepayment) : 'No Prepayment'}
              </Text>
              <Text
                mt="3"
                color="gray.500"
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {(Date.parse(end_rent) - Date.parse(start_rent)) /
                  (1000 * 60 * 60 * 24)}
                {(Date.parse(end_rent) - Date.parse(start_rent)) /
                  (1000 * 60 * 60 * 24) >
                1
                  ? ' Days'
                  : ' Day'}
              </Text>
              <Text
                mt="3"
                color="gray.500"
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {moment(start_rent).format('MMM D') +
                  ' to ' +
                  moment(end_rent).format('MMM D YYYY')}
              </Text>
            </Box>
            <Divider my="5" />
            <Box>
              <Text
                mt="3"
                color="gray.500"
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {userName} ({email})
              </Text>
              <Text
                mt="3"
                color="gray.500"
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {phone}
              </Text>
            </Box>
            <Box mt="12" mb="5" bgColor={colors.primary} rounded="2xl" py="4">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                textAlign="center"
                color="white"
                fontSize="2xl">
                Total Rp {priceFormat(totalPaid)}
              </Text>
            </Box>
            {role.includes('admin') && !Number(isReturned) ? (
              <Box mb="7">
                <Button
                  onPress={setIsReturned}
                  bgColor={colors.secondary}
                  rounded="2xl">
                  <Text
                    fontFamily={fontStyle(fontFamily.primary, 'bold')}
                    textAlign="center"
                    color={colors.primary}
                    fontSize="2xl">
                    Has returned
                  </Text>
                </Button>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </ScrollView>
      )}
    </>
  );
}
