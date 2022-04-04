import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Actionsheet, Box, Input, Pressable, Select} from 'native-base';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import Stepper from '../../components/Stepper';
import {GET_PAYMENT_CODE} from '../../helpers/destinationConstants';
import {colors} from '../../helpers/styleConstants';

export default function PaymentForm({navigation, route}) {
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [showPaymentMethod, setShowPaymentMethod] = React.useState(false);

  const styles = StyleSheet.create({
    dropDownIcon: {
      fontSize: 20,
      marginRight: 12,
    },
  });

  useEffect(() => {
    console.log(route.params);
  }, []);

  const getPaymentCode = () => {
    console.log('Get Payment Code');
    navigation.navigate(GET_PAYMENT_CODE);
  };

  const seePaymentMethod = () => {
    console.log('See Payment Method');
    setShowPaymentMethod(true);
  };

  return (
    <>
      <Box
        px="5"
        pb="6"
        pt="12"
        flex={1}
        backgroundColor="white"
        justifyContent="space-between">
        <Box>
          <Stepper mb="12" count={3} currentlyActive={1} />
          <Input placeholder="Name" />
          <Input placeholder="Email" mt={4} />
          <Input placeholder="Phone" mt={4} />
          <Pressable onPress={seePaymentMethod} mt={4}>
            <Input
              isDisabled={true}
              bgColor={colors.gray}
              placeholder="Payment Method"
              InputRightElement={
                <FAIcon name="caret-down" style={styles.dropDownIcon} />
              }
            />
          </Pressable>
        </Box>
        <CustomButton onPress={getPaymentCode}>See Order Details</CustomButton>
      </Box>
      <Actionsheet
        isOpen={showPaymentMethod}
        onClose={() => setShowPaymentMethod(false)}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
