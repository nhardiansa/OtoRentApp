import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';

import BackSection from '../components/BackSection';
import CustomButton from '../components/CustomButton';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import {globalStyle} from '../helpers/globalStyle';

import {CAR_PLACEHOLDER} from '../assets/images';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';
import {Box, ScrollView, Stack, Select} from 'native-base';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {PAYMENT_STACK} from '../helpers/destinationConstants';

export default function VehicleDetail({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: false,
    });
  }, [navigation]);

  const [date, setDate] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false);
  const [countDay, setCountDay] = useState('');

  const increaseItem = () => {
    console.log('Add Item');
  };

  const decreaseItem = () => {
    console.log('Remove Item');
  };

  const countDayChange = e => {
    setCountDay(e);
  };

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDateChanged(true);
    setDate(currentDate);
  };

  const showMode = async () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: dateChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const doReservation = () => {
    console.log('Reservation');
    navigation.navigate(PAYMENT_STACK);
  };

  const styles = StyleSheet.create({
    starIcon: {
      fontSize: 20,
    },
    ratingText: {
      fontSize: fontSize.lg,
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      color: colors.primary,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      justifyContent: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      position: 'absolute',
      width: '100%',
    },
    backText: {
      display: 'none',
    },
    backIcon: {
      color: colors.secondary,
      fontSize: fontSize.xl,
    },
    headerWrapper: {
      position: 'relative',
    },
    imageWrapper: {
      width: '100%',
      height: 300,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.black,
      top: 0,
      left: 0,
    },
    image: {
      width: '100%',
    },
    detailHeadWrapper: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textPricing: {
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      fontSize: fontSize.slg,
      color: colors.black,
    },
    heartIcon: {
      fontSize: fontSize.xl,
    },
    descWrapper: {
      marginTop: 16,
    },
    desc: {
      fontFamily: fontStyle(fontFamily.primary, 'regular'),
      fontSize: fontSize.md,
      lineHeight: 22,
    },
    availableText: {
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      color: colors.green,
    },
    locationWrapper: {
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    mapMarker: {
      fontSize: fontSize.mlg,
      color: colors.red,
    },
    location: {
      fontFamily: fontStyle(fontFamily.primary, 'medium'),
      fontSize: fontSize.lg,
      marginLeft: 10,
    },
    counterSection: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    counterText: {
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      fontSize: fontSize.lg,
    },
    countNumber: {
      fontFamily: fontStyle(fontFamily.primary, 'black'),
      fontSize: fontSize.lg,
      marginHorizontal: 34,
    },
    counterWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    counterBtn: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 20,
    },
    counterIcon: {
      color: colors.white,
    },
    datePickerWrapper: {
      marginTop: 24,
      flexDirection: 'row',
      alignItems: 'center',
    },
    datePicker: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      paddingVertical: 18,
      paddingHorizontal: 14,
      borderRadius: 10,
      flex: 8,
      marginRight: 18,
    },
    countDay: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      paddingVertical: 5,
      paddingHorizontal: 14,
      // paddingLeft: 0,
      borderRadius: 10,
      flex: 2,
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
    },
    countInput: {
      width: '40%',
    },
    placeholder: {
      flex: 1,
    },
    reservationBtn: {
      marginVertical: 24,
    },
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack style={styles.headerWrapper}>
          <View style={styles.imageWrapper}>
            <Image source={CAR_PLACEHOLDER} style={styles.image} />
          </View>
          <View style={[globalStyle.container, styles.header]}>
            <BackSection
              textStyle={styles.backText}
              iconStyle={styles.backIcon}
              onPress={goBack}
            />
            <View style={styles.rightSection}>
              <Text style={styles.ratingText}>
                4.5 <FAIcon name="star" style={styles.starIcon} />
              </Text>
            </View>
          </View>
        </Stack>

        <Stack style={globalStyle.container}>
          <Box style={[styles.detailHeadWrapper]}>
            <Box>
              <Text style={styles.textPricing}>Vespa Matic</Text>
              <Text style={styles.textPricing}>
                Rp. {Number('100000').toLocaleString()}/day
              </Text>
            </Box>
            <Box style={styles.heartIconWrapper}>
              <FAIcon name="heart" style={styles.heartIcon} />
            </Box>
          </Box>
          <Box style={styles.descWrapper}>
            <Text style={styles.desc}>Max for 2 person</Text>
            <Text style={styles.desc}>No prepayment</Text>
            <Text style={[styles.desc, styles.availableText]}>Available</Text>
          </Box>

          <Box style={styles.locationWrapper}>
            <FAIcon name="map-marker" style={styles.mapMarker} />
            <Text style={styles.location}>Jakarta</Text>
          </Box>

          <Box style={styles.counterSection}>
            <Text style={styles.counterText}>Select vehicles</Text>
            <Box style={styles.counterWrapper}>
              <TouchableHighlight
                onPress={increaseItem}
                underlayColor={colors.primaryDark}
                style={styles.counterBtn}>
                <FAIcon name="minus" style={styles.counterIcon} />
              </TouchableHighlight>
              <Text style={styles.countNumber}>2</Text>
              <TouchableHighlight
                onPress={decreaseItem}
                underlayColor={colors.primaryDark}
                style={styles.counterBtn}>
                <FAIcon name="plus" style={styles.counterIcon} />
              </TouchableHighlight>
            </Box>
          </Box>

          <Box style={styles.datePickerWrapper}>
            <TouchableHighlight
              style={styles.datePicker}
              underlayColor="rgba(0,0,0,0.2)"
              onPress={showMode}>
              <Text>
                {dateChanged ? `${date.toLocaleDateString()}` : 'Select date'}
              </Text>
            </TouchableHighlight>
            <Box style={styles.countDay}>
              <TextInput
                style={styles.countInput}
                onChangeText={countDayChange}
                keyboardType="number-pad"
                value={countDay}
                placeholder="1"
              />
              <Text style={styles.placeholder}>Day</Text>
            </Box>
          </Box>
          <CustomButton
            onPress={doReservation}
            styleContainer={styles.reservationBtn}>
            Reservation
          </CustomButton>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
