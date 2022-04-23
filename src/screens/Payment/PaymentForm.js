import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Actionsheet, Box, Input, Pressable, Select} from 'native-base';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import Stepper from '../../components/Stepper';
import {GET_PAYMENT_CODE} from '../../helpers/destinationConstants';
import {colors} from '../../helpers/styleConstants';
import {useSelector} from 'react-redux';

export default function PaymentForm({navigation, route}) {
  const {userReducer} = useSelector(state => state);
  const {name, email, phone} = userReducer.profile;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const styles = StyleSheet.create({
    dropDownIcon: {
      fontSize: 20,
      marginRight: 12,
    },
  });

  useEffect(() => {
    console.log(userReducer);
  }, []);

  const getPaymentCode = () => {
    console.log('Get Payment Code');
    navigation.navigate(GET_PAYMENT_CODE);
  };

  const seePaymentMethod = () => {
    console.log('See Payment Method');
    setShowPaymentMethod(true);
  };

  const selectPaymentMethod = itemValue => {
    setPaymentMethod(itemValue);
    setShowPaymentMethod(false);
  };

  const paymentMethods = [
    {
      id: 1,
      name: 'Cash',
    },
    {
      id: 2,
      name: 'Credit Card',
    },
    {
      id: 3,
      name: 'Debit Card',
    },
    {
      id: 4,
      name: 'GOPAY',
    },
    {
      id: 5,
      name: 'DANA',
    },
  ];

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
          <Input
            placeholder="Name"
            bgColor="gray.300"
            value={name}
            isDisabled={true}
          />
          <Input
            placeholder="Email"
            value={email}
            bgColor="gray.300"
            isDisabled={true}
            mt={4}
          />
          <Input
            placeholder="Phone"
            value={phone}
            bgColor="gray.300"
            isDisabled={true}
            mt={4}
          />
          <Pressable onPress={seePaymentMethod} mt={4}>
            <Input
              isDisabled={true}
              bgColor={colors.gray}
              placeholder="Payment Method"
              value={paymentMethod}
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
              Payment Methods
            </Text>
          </Box>
          {paymentMethods.map(item => (
            <Actionsheet.Item
              onPress={() => selectPaymentMethod(item.name)}
              key={item.id}>
              {item.name}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
