import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Box, Input, Pressable, Select} from 'native-base';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import Stepper from '../../components/Stepper';

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = React.useState('');

  const styles = StyleSheet.create({
    dropDownIcon: {
      fontSize: 20,
      marginRight: 12,
    },
  });

  return (
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
        <Pressable mt={4}>
          <Input
            placeholder="Payment Method"
            InputRightElement={
              <FAIcon name="caret-down" style={styles.dropDownIcon} />
            }
          />
        </Pressable>
      </Box>
      <CustomButton>See Order Details</CustomButton>
    </Box>
  );
}
