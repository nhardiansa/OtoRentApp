import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';

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
import {Box, ScrollView, Stack, useToast, Text as NVText} from 'native-base';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {
  ADMIN_STACK,
  BOTTOM_TAB,
  EDIT_ITEM_SCREEN,
  HOME_SCREEN,
  HOME_TAB,
  PAYMENT_STACK,
  SEARCH_SCREEN,
} from '../helpers/destinationConstants';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearVehicleDetail,
  setVehicleList,
} from '../redux/actions/vehicleActions';
import {capitalize, normalizeUrl, priceFormat} from '../helpers/formatter';
import moment from 'moment';
import {setDataToSend} from '../redux/actions/transactionActions';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default function VehicleDetail({route, navigation}) {
  const dispatch = useDispatch();
  const {vehiclesReducer, userReducer} = useSelector(state => state);
  const {vehicle, query} = vehiclesReducer;
  const {profile: user} = userReducer;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: false,
    });
  }, [navigation]);

  // const {id: vehicleId} = route.params;
  const toast = useToast();
  const [date, setDate] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false);
  const [countDay, setCountDay] = useState('');
  const [countRent, setCountRent] = useState(0);

  useEffect(() => {
    // if (!vehicle.id) {
    //   navigation.goBack();
    //   return;
    // }

    // dispatch(getVehicleDetail());
    if (Object.keys(vehicle).length < 1) {
      navigation.replace(BOTTOM_TAB, {
        screen: HOME_TAB,
        params: {
          screen: HOME_SCREEN,
        },
      });
      return;
    }

    console.log(route, 'route');

    return () => {
      dispatch(clearVehicleDetail());
      dispatch(setVehicleList(query));
    };
  }, []);

  useEffect(() => {
    if (Object.keys(vehicle).length < 1) {
      navigation.replace(BOTTOM_TAB, {
        screen: HOME_TAB,
        params: {
          screen: HOME_SCREEN,
        },
      });
    }
  }, [vehicle]);

  const increaseItem = () => {
    const limit = vehicle.qty - vehicle.booked;

    if (countRent === limit) {
      return;
    }
    setCountRent(countRent + 1);
  };

  const decreaseItem = () => {
    if (countRent <= 0) {
      return;
    }
    setCountRent(countRent - 1);
  };

  const countDayChange = e => {
    const value = parseInt(e);

    if (value < 1) {
      setCountDay(1);
      return;
    }

    const idtoast = 'countDayChange';
    if (value > 30) {
      setCountDay(30);
      if (!toast.isActive(idtoast)) {
        toast.show({
          id: idtoast,
          description: 'Maximum 30 days',
        });
      }
      return;
    }

    setCountDay(e);
  };

  const dateChange = (event, selectedDate) => {
    if (event.type !== 'set') {
      return;
    }

    const toastDanger = 'toast-danger';
    if (selectedDate < date) {
      if (toast.isActive(toastDanger)) {
        return;
      }
      toast.show({
        id: toastDanger,
        render: () => (
          <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
            <NVText
              color="white"
              fontSize="md"
              fontFamily={fontStyle(fontFamily.primary)}>
              Date cannot be earlier than today's date.
            </NVText>
          </Box>
        ),
      });
      return;
    }

    setDateChanged(true);
    setDate(selectedDate);
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
    if (vehicle.booked === vehicle.qty) {
      const idtoast = 'full booked';
      if (!toast.isActive(idtoast)) {
        toast.show({
          id: idtoast,
          description: 'Vehicle is full booked',
          duration: 1000,
        });
      }
      return;
    }

    if (countDay < 1) {
      const idtoast = 'summary';
      if (!toast.isActive(idtoast)) {
        toast.show({
          id: idtoast,
          description: 'Input the number of rental days',
          duration: 1000,
        });
      }
      return;
    }

    if (countRent < 1) {
      const idtoast = 'summary countRent';
      if (!toast.isActive(idtoast)) {
        toast.show({
          id: idtoast,
          description: 'Input the number of rental items',
          duration: 1000,
        });
      }
      return;
    }

    const startDate = new Date(date).toISOString().split('T')[0];
    const endDate = new Date(
      new Date(date).setDate(date.getDate() + parseInt(countDay)),
    )
      .toISOString()
      .split('T')[0];

    const tempData = {
      vehicle_id: vehicle.id,
      qty: countRent,
      start_rent: startDate,
      end_rent: endDate,
    };

    dispatch(setDataToSend(tempData));

    navigation.push(PAYMENT_STACK);
  };

  const changeStockHandler = type => {
    console.log(type);
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
      minHeight: 300,
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
      color: vehicle.booked === vehicle.qty ? colors.red : colors.green,
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
    <>
      {Object.keys(vehicle).length > 0 && (
        <SafeAreaView>
          <ScrollView>
            <Stack key={1} style={styles.headerWrapper}>
              <View style={styles.imageWrapper}>
                <Image
                  source={
                    vehicle.image
                      ? normalizeUrl(vehicle.image)
                      : CAR_PLACEHOLDER
                  }
                  style={styles.image}
                />
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

            <Stack key={2} style={globalStyle.container}>
              <Box style={[styles.detailHeadWrapper]}>
                <Box>
                  <Text style={styles.textPricing}>
                    {capitalize(vehicle.name)}
                  </Text>
                  <Text style={styles.textPricing}>
                    Rp. {priceFormat(vehicle.price)}/day
                  </Text>
                </Box>
                <Box style={styles.heartIconWrapper}>
                  <FAIcon name="heart" style={styles.heartIcon} />
                </Box>
              </Box>
              <Box style={styles.descWrapper}>
                <Text style={styles.desc}>
                  Max for {vehicle.capacity} person
                </Text>
                <NVText
                  fontFamily={fontStyle(fontFamily.primary)}
                  fontSize="md"
                  color="gray.500">
                  {Number(vehicle.prepayment)
                    ? 'Can be prepayment'
                    : 'No prepayment'}
                </NVText>
                <Text style={[styles.desc, styles.availableText]}>
                  {vehicle.booked === vehicle.qty
                    ? 'Not Available'
                    : 'Available'}
                </Text>
              </Box>

              <Box style={styles.locationWrapper}>
                <FAIcon name="map-marker" style={styles.mapMarker} />
                <Text style={styles.location}>
                  {capitalize(vehicle.location)}
                </Text>
              </Box>

              {user?.role.includes('admin') ? (
                <Box>
                  <Box style={styles.counterSection}>
                    <Text style={styles.counterText}>Stocks</Text>
                    <Box style={styles.counterWrapper}>
                      <TouchableHighlight
                        onPress={() => changeStockHandler('minus')}
                        underlayColor={colors.primaryDark}
                        style={styles.counterBtn}>
                        <FAIcon name="minus" style={styles.counterIcon} />
                      </TouchableHighlight>
                      <Text style={styles.countNumber}>{countRent}</Text>
                      <TouchableHighlight
                        onPress={() => changeStockHandler('plus')}
                        underlayColor={colors.primaryDark}
                        style={styles.counterBtn}>
                        <FAIcon name="plus" style={styles.counterIcon} />
                      </TouchableHighlight>
                    </Box>
                  </Box>
                  <CustomButton
                    onPress={() =>
                      navigation.navigate(ADMIN_STACK, {
                        screen: EDIT_ITEM_SCREEN,
                      })
                    }
                    styleContainer={styles.reservationBtn}>
                    Edit Item
                  </CustomButton>
                </Box>
              ) : (
                <Box>
                  <Box style={styles.counterSection}>
                    <Text style={styles.counterText}>Select vehicles</Text>
                    <Box style={styles.counterWrapper}>
                      <TouchableHighlight
                        onPress={decreaseItem}
                        underlayColor={colors.primaryDark}
                        style={styles.counterBtn}>
                        <FAIcon name="minus" style={styles.counterIcon} />
                      </TouchableHighlight>
                      <Text style={styles.countNumber}>{countRent}</Text>
                      <TouchableHighlight
                        onPress={increaseItem}
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
                        {dateChanged
                          ? `${moment(date).format('DD MMMM YYYY')}`
                          : 'Select date'}
                      </Text>
                    </TouchableHighlight>
                    <Box style={styles.countDay}>
                      <TextInput
                        style={styles.countInput}
                        onChangeText={countDayChange}
                        keyboardType="number-pad"
                        value={countDay.toString()}
                        placeholder="0"
                      />
                      <Text style={styles.placeholder}>Day</Text>
                    </Box>
                  </Box>
                  <CustomButton
                    onPress={doReservation}
                    styleContainer={styles.reservationBtn}>
                    Reservation
                  </CustomButton>
                </Box>
              )}
            </Stack>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
