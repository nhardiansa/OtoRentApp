import {} from 'react-native';
import React from 'react';

import BackSection from '../../components/BackSection';
import {Box, Divider, Image, ScrollView, Text} from 'native-base';

import {CAR_PLACEHOLDER} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import Stepper from '../../components/Stepper';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import {priceFormat} from '../../helpers/formatter';

export default function GetPaymentCode({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <BackSection title="Order Form" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);
  return (
    <ScrollView>
      <Box px="5" pb="12" pt="12" flex={1} backgroundColor="white">
        <Stepper count={3} currentlyActive={2} mb="12" />
        <Image
          resizeMode="cover"
          minHeight="48"
          w="full"
          source={CAR_PLACEHOLDER}
          rounded="lg"
          alignSelf="center"
        />
        <Box mt={12}>
          <Text
            fontFamily={fontStyle(fontFamily.primary)}
            fontSize="lg"
            mb={3}
            color={colors.grayDark}>
            2 Vespa
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
            4 Days
          </Text>
          <Text
            fontFamily={fontStyle(fontFamily.primary)}
            fontSize="lg"
            mb={3}
            color={colors.grayDark}>
            Jan 18 2021 to Jan 22 2021
          </Text>
        </Box>
        <Divider mt={5} mb="9" />
        <Text
          mb={8}
          fontSize="4xl"
          fontFamily={fontStyle(fontFamily.primary, 'bold')}>
          Rp {priceFormat(100000)}
        </Text>

        <CustomButton> Bayar </CustomButton>
      </Box>
    </ScrollView>
  );
}
