import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {
  Box,
  ScrollView,
  Stack,
  useToast,
  Text as NVText,
  Input,
  Switch,
  Actionsheet,
  FlatList,
  Pressable,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  BOTTOM_TAB,
  HOME_SCREEN,
  HOME_TAB,
  VEHICLE_DETAIL,
} from '../helpers/destinationConstants';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';
import BackSection from '../components/BackSection';
import {CAR_PLACEHOLDER} from '../assets/images';
import {capitalize, normalizeUrl, priceFormat} from '../helpers/formatter';
import {globalStyle} from '../helpers/globalStyle';
import {launchImageLibrary as ImagePicker} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import {blobFetch} from '../helpers/http';
import LoadingScreen from '../components/LoadingScreen';
import {
  getVehicleDetail,
  clearVehicleDetail,
} from '../redux/actions/vehicleActions';

export default function UpdateVehicle({navigation}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const {vehiclesReducer, authReducer} = useSelector(state => state);
  const {vehicle, locations, loading: loadingRedux} = vehiclesReducer;
  const {user: auth} = authReducer;

  const [showLocations, setShowLocations] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    image: {},
    name: vehicle.name,
    price: vehicle.price,
    prepayment: Number(vehicle.prepayment) ? true : false,
    capacity: vehicle.capacity,
    qty: vehicle.qty,
    location: vehicle.location,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(vehicle).length < 1) {
      navigation.replace(BOTTOM_TAB, {
        screen: HOME_TAB,
        params: {
          screen: HOME_SCREEN,
        },
      });
    }

    console.log('vehicle', vehicle);
  }, []);

  const goBack = () => {
    navigation.navigate(VEHICLE_DETAIL);
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
      position: 'relative',
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
      marginTop: 32,
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

  const onChange = (name, value) => {
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const showImagePicker = async () => {
    try {
      const response = await ImagePicker({});
      if (response.didCancel) {
        return false;
      }

      console.log('response', response);

      if (response.assets[0].fileSize > 2097152) {
        const id = 'image_size_error';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Error',
            description: 'Image size must be less than 2MB',
            status: 'error',
            duration: 3000,
            placement: 'top',
          });
        }

        return;
      }

      const fileType = response.assets[0].type;
      const validType = ['image/jpeg', 'image/png'];

      if (!validType.includes(fileType)) {
        const id = 'image_type_error';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Error',
            description: 'Image type must be jpeg or png',
            status: 'error',
            duration: 3000,
            placement: 'top',
          });
        }
        return;
      }

      const height = response.assets[0].height;
      const width = response.assets[0].width;

      if (height < 200 || width < 200) {
        const id = 'image_size_error';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Error',
            description: 'Image size must be at least 200x200',
            status: 'error',
            duration: 3000,
            placement: 'top',
          });
        }
        return;
      }

      const pickedImage = response.assets[0];
      setVehicleData({
        ...vehicleData,
        image: {
          uri: pickedImage.uri,
          type: pickedImage.type,
          name: pickedImage.fileName,
          data: RNFetchBlob.wrap(pickedImage.uri),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdateHandler = async () => {
    try {
      const dataToSend = {};

      for (const key in vehicleData) {
        if (vehicleData[key] !== vehicle[key]) {
          dataToSend[key] = vehicleData[key];
        }
      }

      if (Object.keys(vehicleData.image).length < 1) {
        delete dataToSend.image;
      }

      console.log(dataToSend);

      // if (Object.keys(vehicleData).length < 10) {
      //   return;
      // }

      const finalData = [];

      for (const key in dataToSend) {
        if (key === 'image') {
          finalData.push({
            name: 'image',
            filename: vehicleData.image.name,
            data: vehicleData.image.data,
            type: vehicleData.image.type,
          });
        } else {
          finalData.push({
            name: key,
            data: String(vehicleData[key]),
          });
        }
      }

      setIsLoading(true);

      const result = await blobFetch(
        'PATCH',
        `vehicles/${vehicle.id}`,
        finalData,
        auth.token,
      );

      const response = await JSON.parse(result.data);

      console.log(response);

      if (response.success) {
        const id = 'update_success';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            render: () => (
              <Box bg="success.600" px="2" py="1" rounded="sm" mb={5}>
                <NVText
                  color="white"
                  fontSize="md"
                  fontFamily={fontStyle(fontFamily.primary)}>
                  {response.message}
                </NVText>
              </Box>
            ),
          });
        }
      } else {
        const id = 'update_error';
        toast.show({
          id,
          render: () => (
            <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
              <NVText
                color="white"
                fontSize="md"
                fontFamily={fontStyle(fontFamily.primary)}>
                {response.message}
              </NVText>
            </Box>
          ),
        });
      }

      dispatch(getVehicleDetail(vehicle.id));

      setIsLoading(false);
    } catch (err) {
      console.error(err.response ? err.response : err);
      const message = await (err.response
        ? JSON.parse(err.response.data.message)
        : err.message);
      id = 'update_item_error';
      if (!toast.isActive(id)) {
        toast.show({
          title: 'Failed to add vehicle 2',
          description: err.response ? message : err.message,
          status: 'error',
          duration: 3000,
          placement: 'bottom',
          isClosable: true,
        });
      }
      setIsLoading(false);
    }
  };

  const onDeleteHandler = async () => {
    try {
      setIsLoading(true);

      const result = await blobFetch(
        'DELETE',
        `vehicles/${vehicle.id}`,
        null,
        auth.token,
      );

      const response = await JSON.parse(result.data);

      console.log(response);

      if (response.success) {
        const id = 'delete_success';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            render: () => (
              <Box bg="success.600" px="2" py="1" rounded="sm" mb={5}>
                <NVText
                  color="white"
                  fontSize="md"
                  fontFamily={fontStyle(fontFamily.primary)}>
                  {response.message}
                </NVText>
              </Box>
            ),
          });
        }
      } else {
        const id = 'delete_error';
        toast.show({
          id,
          render: () => (
            <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
              <NVText
                color="white"
                fontSize="md"
                fontFamily={fontStyle(fontFamily.primary)}>
                {response.message}
              </NVText>
            </Box>
          ),
        });
      }

      dispatch(clearVehicleDetail());

      setIsLoading(false);
    } catch (err) {
      console.error(err.response ? err.response : err);
      const message = await (err.response
        ? JSON.parse(err.response.data.message)
        : err.message);
      id = 'delete_item_error';
      if (!toast.isActive(id)) {
        toast.show({
          id,
          render: () => (
            <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
              <NVText
                color="white"
                fontSize="md"
                fontFamily={fontStyle(fontFamily.primary)}>
                {message}
              </NVText>
            </Box>
          ),
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading || loadingRedux ? (
        <LoadingScreen
          title={loadingRedux ? 'Getting new vehicle data' : 'Updating vehicle'}
        />
      ) : (
        <></>
      )}
      <SafeAreaView>
        <ScrollView>
          <Stack style={styles.headerWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={
                  vehicleData.image.uri
                    ? {uri: vehicleData.image.uri}
                    : normalizeUrl(vehicle.image, CAR_PLACEHOLDER)
                }
                style={styles.image}
              />
              <Box position="absolute" w="full">
                <Pressable onPress={showImagePicker}>
                  <Box
                    alignSelf="center"
                    bgColor="dark.200"
                    p="2"
                    rounded="xl"
                    flexDir="row"
                    alignItems="center">
                    <FAIcon name="upload" size={20} color="white" />
                    <NVText
                      ml="3"
                      fontSize="xl"
                      color="gray.200"
                      fontFamily={fontStyle(fontFamily.primary, 'bold')}>
                      Upload
                    </NVText>
                  </Box>
                </Pressable>
              </Box>
            </View>
            <View style={[globalStyle.container, styles.header]}>
              <BackSection
                textStyle={styles.backText}
                iconStyle={styles.backIcon}
                onPress={goBack}
              />
            </View>
          </Stack>

          <Stack style={globalStyle.container}>
            <Box style={[styles.detailHeadWrapper]}>
              <Box>
                {/* <Text style={styles.textPricing}>{capitalize(vehicle.name)}</Text> */}
                <Input
                  variant="underlined"
                  placeholder="Vehicle Name"
                  bgColor="gray.100"
                  p="0"
                  paddingLeft="0"
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  color={colors.black}
                  fontSize={fontSize.slg}
                  borderBottomColor="gray.300"
                  value={capitalize(vehicleData.name)}
                  mb="3"
                  onChangeText={value => onChange('name', value)}
                />
                {/* <Text style={styles.textPricing}>
                Rp. {priceFormat(vehicle.price)}/day
              </Text> */}
                <Input
                  variant="underlined"
                  placeholder="Vehicle Name"
                  bgColor="gray.100"
                  p="0"
                  paddingLeft="0"
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  color={colors.black}
                  fontSize={fontSize.slg}
                  borderBottomColor="gray.300"
                  defaultValue={String(vehicle.price)}
                  rightElement={<Text style={styles.textPricing}>/day</Text>}
                  keyboardType="number-pad"
                  onChangeText={value => onChange('price', value)}
                />
              </Box>
              <Box style={styles.heartIconWrapper} pr="4">
                <Pressable onPress={onDeleteHandler}>
                  <FAIcon name="trash" style={styles.heartIcon} />
                </Pressable>
              </Box>
            </Box>
            <Box style={styles.descWrapper}>
              {/* <Text style={styles.desc}>Max for {vehicle.capacity} person</Text> */}
              {/* <NVText
              fontFamily={fontStyle(fontFamily.primary)}
              fontSize="md"
              color="gray.500">
              {Number(vehicle.prepayment)
                ? 'Can be prepayment'
                : 'No prepayment'}
            </NVText> */}
              {/* <Text style={[styles.desc, styles.availableText]}>
              {vehicle.booked === vehicle.qty ? 'Not Available' : 'Available'}
            </Text> */}
            </Box>

            {/* <Box style={styles.locationWrapper}>
              <FAIcon name="map-marker" style={styles.mapMarker} />
              <Text style={styles.location}>
                {capitalize(vehicle.location)}
              </Text>
            </Box> */}

            <Box>
              <Pressable onPress={() => setShowLocations(true)}>
                <Input
                  variant="underlined"
                  placeholder="Location"
                  fontFamily={fontStyle(fontFamily.primary, 'medium')}
                  fontSize={fontSize.lg}
                  color={colors.grayDark}
                  isDisabled={true}
                  bgColor="gray.100"
                  borderBottomColor="gray.300"
                  value={
                    vehicleData.location
                      ? capitalize(vehicleData.location)
                      : capitalize(vehicle.location)
                  }
                  p="0"
                  w="1/2"
                  leftElement={
                    <FAIcon name="map-marker" style={styles.mapMarker} />
                  }
                />
              </Pressable>
            </Box>

            <Box style={styles.counterSection}>
              <Text style={styles.counterText}>Maximum capacity</Text>
              <Box style={styles.counterWrapper}>
                <TouchableHighlight
                  onPress={() => {
                    if (vehicleData.capacity > 1) {
                      onChange('capacity', vehicleData.capacity - 1);
                    }
                  }}
                  underlayColor={colors.primaryDark}
                  style={styles.counterBtn}>
                  <FAIcon name="minus" style={styles.counterIcon} />
                </TouchableHighlight>
                <Text style={styles.countNumber}>{vehicleData.capacity}</Text>
                <TouchableHighlight
                  onPress={() => onChange('capacity', vehicleData.capacity + 1)}
                  underlayColor={colors.primaryDark}
                  style={styles.counterBtn}>
                  <FAIcon name="plus" style={styles.counterIcon} />
                </TouchableHighlight>
              </Box>
            </Box>
            <Box style={styles.counterSection}>
              <Text style={styles.counterText}>Stocks</Text>
              <Box style={styles.counterWrapper}>
                <TouchableHighlight
                  onPress={() => {
                    if (vehicleData.qty > 1) {
                      onChange('qty', vehicleData.qty - 1);
                    }
                  }}
                  underlayColor={colors.primaryDark}
                  style={styles.counterBtn}>
                  <FAIcon name="minus" style={styles.counterIcon} />
                </TouchableHighlight>
                <Text style={styles.countNumber}>{vehicleData.qty}</Text>
                <TouchableHighlight
                  onPress={() => {
                    onChange('qty', vehicleData.qty + 1);
                  }}
                  underlayColor={colors.primaryDark}
                  style={styles.counterBtn}>
                  <FAIcon name="plus" style={styles.counterIcon} />
                </TouchableHighlight>
              </Box>
            </Box>
            <Box style={styles.counterSection}>
              <Text style={styles.counterText}>Can prepayment</Text>
              <Switch
                offTrackColor={colors.gray}
                onTrackColor={colors.primary}
                onThumbColor={colors.white}
                value={vehicleData.prepayment}
                onValueChange={value => {
                  console.log(value);
                  onChange('prepayment', value);
                }}
              />
            </Box>
            <CustomButton
              onPress={onUpdateHandler}
              styleContainer={styles.reservationBtn}>
              Edit Item
            </CustomButton>
          </Stack>
        </ScrollView>
      </SafeAreaView>
      <Actionsheet
        isOpen={showLocations}
        onClose={() => setShowLocations(false)}
        hideDragIndicator>
        <Actionsheet.Content borderTopRadius="0">
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Select Type
            </Text>
          </Box>
          <FlatList
            data={locations}
            width="100%"
            renderItem={({item}) => (
              <Actionsheet.Item
                onPress={() => {
                  onChange('location', item.location);
                  setShowLocations(false);
                }}>
                {capitalize(item.location)}
              </Actionsheet.Item>
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
