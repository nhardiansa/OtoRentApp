import React from 'react';
import moment from 'moment';
import {Box, Image, Text} from 'native-base';
import {
  CAR_PLACEHOLDER,
  MOTORBIKE_PLACEHOLDER,
  BIKE_PLACEHOLDER,
} from '../assets/images';
import {capitalize, normalizeUrl} from '../helpers/formatter';
import {colors, fontFamily, fontStyle} from '../helpers/styleConstants';

export default function HistoryItem({
  type,
  name,
  image,
  paymentStatus,
  returnStatus,
  startRent,
  endRent,
  prepayment,
}) {
  let placeholder;
  let vehicleStatus;

  switch (type) {
  case 'car': {
    placeholder = CAR_PLACEHOLDER;
    break;
  }
  case 'motorbike': {
    placeholder = MOTORBIKE_PLACEHOLDER;
    break;
  }
  case 'bike': {
    placeholder = BIKE_PLACEHOLDER;
    break;
  }
  default: {
    placeholder = CAR_PLACEHOLDER;
    break;
  }
  }

  if (Number(paymentStatus)) {
    vehicleStatus = 'Paid';
    if (Number(returnStatus)) {
      vehicleStatus = 'Returned';
    } else {
      vehicleStatus = 'Not Returned';
    }
  } else {
    vehicleStatus = 'Not paid';
  }

  return (
    <>
      <Box flexDir="row" alignItems="center">
        <Box mr="6">
          <Image
            w="32"
            h="24"
            borderRadius="3xl"
            source={image ? normalizeUrl(image) : placeholder}
            alt="vehicle"
          />
        </Box>
        <Box>
          <Text
            fontSize="sm"
            fontFamily={fontStyle(fontFamily.primary, 'bold')}>
            {capitalize(name)}
          </Text>
          <Text fontSize="sm" fontFamily={fontStyle(fontFamily.primary)}>
            {moment(startRent).format('MMM D')} to{' '}
            {moment(endRent).format('D YYYY')}
          </Text>
          <Text
            fontSize="sm"
            fontFamily={fontStyle(fontFamily.primary, 'bold')}>
            {prepayment ? prepayment : 'No prepayment'}
          </Text>
          <Text
            fontSize="sm"
            color={vehicleStatus.includes('Not') ? colors.red : colors.green}
            fontFamily={fontStyle(fontFamily.primary)}>
            {vehicleStatus}
          </Text>
        </Box>
      </Box>
    </>
  );
}
