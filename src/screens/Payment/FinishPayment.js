import {} from 'react-native';
import React from 'react';
import {Box, Divider, ScrollView, Text} from 'native-base';
import Stepper from '../../components/Stepper';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import CustomButton from '../../components/CustomButton';
import {priceFormat} from '../../helpers/formatter';
import BackSection from '../../components/BackSection';

export default function FinishPayment({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <BackSection
          title="Payment Detail"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  return (
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
          fontSize="4xl"
          fontFamily={fontStyle(fontFamily.primary, 'bold')}>
          90887620
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
          <Text
            fontFamily={fontStyle(fontFamily.primary, 'bold')}
            color="green.700">
            VSP09875
          </Text>
        </Text>
        <Text mb="4" fontSize="sm" fontFamily={fontStyle(fontFamily.primary)}>
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
          Order details : {'\n'}2 Vespa {'\n'}
          Prepayement (no tax) {'\n'}4 days {'\n'}
          Jan 18 2021 to Jan 22 2021
        </Text>
        <Divider mb="7" />
        <Text
          mb="5"
          fontSize="4xl"
          alignSelf="flex-start"
          fontFamily={fontStyle(fontFamily.primary, 'bold')}>
          Rp {priceFormat(100000)}
        </Text>
        <Box w="full">
          <CustomButton>Finish Payment</CustomButton>
        </Box>
      </Box>
    </ScrollView>
  );
}
