import {} from 'react-native';
import React, {useLayoutEffect, useEffect, useState} from 'react';

import BackSection from '../../components/BackSection';
import {Box, Divider, Image, ScrollView, Text} from 'native-base';

import {
  CAR_PLACEHOLDER,
  MOTORBIKE_PLACEHOLDER,
  BIKE_PLACEHOLDER,
} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import Stepper from '../../components/Stepper';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import {capitalize, normalizeUrl, priceFormat} from '../../helpers/formatter';
import {FINISH_PAYMENT} from '../../helpers/destinationConstants';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {createTransaction} from '../../redux/actions/transactionActions';

export default function GetPaymentCode({navigation}) {
  const dispatch = useDispatch();
  const {transactionReducer, vehiclesReducer, authReducer} = useSelector(
    state => state,
  );
  const {
    price,
    name,
    image,
    category_name: categoryName,
  } = vehiclesReducer.vehicle;
  const {end_rent, start_rent, qty} = transactionReducer.dataToSend;
  const {token} = authReducer.user;

  const [placeHolder, setPlaceHolder] = useState(CAR_PLACEHOLDER);

  useEffect(() => {
    if (!transactionReducer.dataToSend) {
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    if (transactionReducer.details) {
      navigation.replace(FINISH_PAYMENT);
    }
  }, [transactionReducer.details]);

  useEffect(() => {
    switch (categoryName) {
      case 'motorbike': {
        console.log('motorbikes');
        if (MOTORBIKE_PLACEHOLDER !== placeHolder) {
          setPlaceHolder(MOTORBIKE_PLACEHOLDER);
        }
        break;
      }

      case 'bike': {
        if (BIKE_PLACEHOLDER !== placeHolder) {
          setPlaceHolder(BIKE_PLACEHOLDER);
        }
        break;
      }

      default: {
        if (CAR_PLACEHOLDER !== placeHolder) {
          setPlaceHolder(CAR_PLACEHOLDER);
        }
      }
    }
  }, [placeHolder]);

  const finishPayment = () => {
    console.log('finish payment');
    const finalDataToSend = {
      ...transactionReducer.dataToSend,
      payment: 0,
      returned: 0,
      prepayment: 0,
    };

    dispatch(createTransaction(finalDataToSend, token));

    // navigation.replace(FINISH_PAYMENT);
  };

  return (
    <ScrollView>
      <Box px="5" pb="12" pt="12" flex={1} backgroundColor="white">
        <Stepper count={3} currentlyActive={2} mb="12" />
        <Image
          resizeMode="cover"
          minHeight="48"
          w="full"
          source={image ? normalizeUrl(image) : placeHolder}
          rounded="lg"
          alignSelf="center"
          alt="image placeholder"
        />
        <Box mt={12}>
          <Text
            fontFamily={fontStyle(fontFamily.primary)}
            fontSize="lg"
            mb={3}
            color={colors.grayDark}>
            {qty} {capitalize(name)}
          </Text>
          <Text
            fontFamily={fontStyle(fontFamily.primary)}
            fontSize="lg"
            mb={3}
            color={colors.grayDark}>
            Prepayment (no tax)
          </Text>
          <Text
            fontFamily={fontStyle(fontFamily.primary)}
            fontSize="lg"
            mb={3}
            color={colors.grayDark}>
            {(Date.parse(end_rent) - Date.parse(start_rent)) /
              (1000 * 60 * 60 * 24)}{' '}
            Days
          </Text>
          <Text
            fontFamily={fontStyle(fontFamily.primary)}
            fontSize="lg"
            mb={3}
            color={colors.grayDark}>
            {moment(start_rent).format('MMM D')} to{' '}
            {moment(end_rent).format('MMM D YYYY')}
          </Text>
        </Box>
        <Divider mt={5} mb="9" />
        <Text
          mb={8}
          fontSize="4xl"
          fontFamily={fontStyle(fontFamily.primary, 'bold')}>
          Rp {priceFormat(qty * price)}
        </Text>

        <CustomButton onPress={finishPayment}> Get Payment Code </CustomButton>
      </Box>
    </ScrollView>
  );
}
