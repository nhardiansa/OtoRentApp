import React, {useLayoutEffect, useState} from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Image,
  Input,
  Pressable,
  ScrollView,
  Switch,
  Text,
  useToast,
} from 'native-base';
import BackSection from '../../components/BackSection';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';

import {BLANK_PLACEHOLDER} from '../../assets/images';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary as ImagePicker} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import {capitalize} from '../../helpers/formatter';
import LoadingScreen from '../../components/LoadingScreen';
import {blobFetch} from '../../helpers/http';

export default function AddItem({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: true,
      headerLeft: () => <BackSection onPress={() => navigation.goBack()} />,
      headerShadowVisible: false,
      headerRight: () => (
        <Text
          fontFamily={fontStyle(fontFamily.primary, 'bold')}
          color="gray.400"
          fontSize="lg">
          Cancel
        </Text>
      ),
    });
  }, [navigation]);

  const toast = useToast();
  const {vehiclesReducer, authReducer} = useSelector(state => state);
  const {categories} = vehiclesReducer;
  const {token} = authReducer.user;

  const [vehicleData, setVehicleData] = useState({
    image: {},
    name: '',
    price: 0,
    prepayment: false,
    capacity: 0,
    qty: 0,
    location: '',
    category_id: '',
  });

  const [showCategories, setShowCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onChangeHandler = (key, value, type) => {
    if (type === 'number') {
      const number = parseInt(value, 10);

      if (number < 1) {
        setVehicleData({
          ...vehicleData,
          [key]: 1,
        });
      } else {
        setVehicleData({
          ...vehicleData,
          [key]: number,
        });
      }

      return;
    }
    setVehicleData({
      ...vehicleData,
      [key]: value,
    });
  };

  const onSubmitHandler = async () => {
    try {
      if (
        !vehicleData.name ||
        !Number(vehicleData.price) ||
        !vehicleData.category_id ||
        !vehicleData.location ||
        !Number(vehicleData.capacity) ||
        !Number(vehicleData.qty)
      ) {
        const id = 'empty_fields_error';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Error',
            description: 'Please fill all the fields',
            status: 'error',
            duration: 3000,
            placement: 'top',
          });
        }
        return;
      }

      const dataToSend = [];
      for (const key in vehicleData) {
        if (vehicleData[key]) {
          if (key === 'image') {
            dataToSend.push({
              name: 'image',
              filename: vehicleData.image.name,
              data: vehicleData.image.data,
              type: vehicleData.image.type,
            });
          } else {
            dataToSend.push({
              name: key,
              data: String(vehicleData[key]),
            });
          }
        }
      }

      dataToSend.push({
        name: 'prepayment',
        data: vehicleData.prepayment ? '1' : '0',
      });

      console.log('dataToSend', dataToSend);

      setIsLoading(true);

      const result = await blobFetch('POST', 'vehicles', dataToSend, token);

      const response = await JSON.parse(result.data);

      if (response.success) {
        const id = 'success';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Success add vehicle',
            description: response.message,
            status: 'success',
            duration: 3000,
            placement: 'top',
            isClosable: true,
          });
        }
        navigation.goBack();
      } else {
        console.error(result);
        const id = 'error';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Failed to add vehicle 1',
            description: response.message,
            status: 'error',
            duration: 3000,
            placement: 'top',
            isClosable: true,
          });
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err.response ? err.response : err);
      const message = await (err.response
        ? JSON.parse(err.response.data.message)
        : err.message);
      id = 'add_item_error';
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

  return (
    <>
      {isLoading && <LoadingScreen title="Saving Data...." />}
      <Box flex={1} px="6" bgColor="white">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box alignItems="center" mt="16">
            <Image
              alt="inputImage"
              w="40"
              h="40"
              source={
                vehicleData.image.uri
                  ? {uri: vehicleData.image.uri}
                  : BLANK_PLACEHOLDER
              }
              rounded="full"
            />
            <Button
              onPress={showImagePicker}
              bgColor="warning.500"
              mt="6"
              rounded="lg">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="md"
                color="white">
                Add picture
              </Text>
            </Button>
          </Box>
          <Box mt="10">
            <Box>
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg">
                Name
              </Text>

              <Input
                mt="3"
                placeholder="Input the vehicle name"
                bgColor="white"
                variant="underlined"
                paddingLeft="0"
                onChangeText={text => onChangeHandler('name', text)}
              />
            </Box>
            <Box mt="6">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg">
                Price
              </Text>

              <Input
                mt="3"
                placeholder="Input the vehicle price"
                bgColor="white"
                variant="underlined"
                paddingLeft="0"
                keyboardType="numeric"
                value={vehicleData.price ? String(vehicleData.price) : ''}
                onChangeText={text => onChangeHandler('price', text, 'number')}
              />
            </Box>
            <Box mt="6" flexDir="row" justifyContent="space-between">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg">
                Can prepayment
              </Text>

              <Switch
                alignSelf="flex-start"
                offTrackColor={colors.gray}
                onTrackColor={colors.primary}
                onThumbColor={colors.white}
                value={vehicleData.prepayment}
                onValueChange={() => {
                  setVehicleData({
                    ...vehicleData,
                    prepayment: !vehicleData.prepayment,
                  });
                }}
              />
            </Box>
            <Box mt="6">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg">
                Capacity
              </Text>

              <Input
                mt="3"
                placeholder="Input the vehicle capacity"
                bgColor="white"
                variant="underlined"
                paddingLeft="0"
                keyboardType="numeric"
                value={vehicleData.capacity ? String(vehicleData.capacity) : ''}
                onChangeText={text =>
                  onChangeHandler('capacity', text, 'number')
                }
              />
            </Box>
            <Box mt="6">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg">
                Location
              </Text>

              <Input
                mt="3"
                placeholder="Input the city of the vehicle"
                bgColor="white"
                variant="underlined"
                paddingLeft="0"
                onChangeText={text => onChangeHandler('location', text)}
              />
            </Box>
            <Box mt="6">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg">
                Category
              </Text>

              <Pressable onPress={() => setShowCategories(true)}>
                <Input
                  mt="3"
                  placeholder="Select the vehicle category"
                  value={
                    vehicleData.category_id
                      ? capitalize(
                          categories.find(c => c.id === vehicleData.category_id)
                            .name,
                        )
                      : ''
                  }
                  borderColor={colors.gray}
                  bgColor={colors.gray}
                  isDisabled={true}
                  rightElement={
                    <Box mr="5">
                      <FAIcon
                        name="caret-down"
                        size={20}
                        color={colors.grayDark}
                      />
                    </Box>
                  }
                />
              </Pressable>
            </Box>
            <Box mt="6" flexDir="row" justifyContent="space-between">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg">
                Stock
              </Text>

              <Box flexDir="row" alignItems="center">
                <Pressable
                  onPress={() => {
                    if (vehicleData.qty === 0) {
                      return;
                    }
                    setVehicleData({
                      ...vehicleData,
                      qty: vehicleData.qty - 1,
                    });
                  }}>
                  <Box bgColor="warning.500" p="3" rounded="full">
                    <FAIcon name="minus" color={colors.white} />
                  </Box>
                </Pressable>
                <Text
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  fontSize="lg"
                  mx="3">
                  {String(vehicleData.qty)}
                </Text>
                <Pressable
                  onPress={() => {
                    setVehicleData({
                      ...vehicleData,
                      qty: vehicleData.qty + 1,
                    });
                  }}>
                  <Box bgColor="warning.500" p="3" rounded="full">
                    <FAIcon name="plus" color={colors.white} />
                  </Box>
                </Pressable>
              </Box>
            </Box>

            <Button
              onPress={onSubmitHandler}
              my="8"
              py="3"
              bgColor="warning.500"
              mt="6"
              rounded="xl">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg"
                color="white">
                Save vehicle
              </Text>
            </Button>
          </Box>
        </ScrollView>
      </Box>
      <Actionsheet
        isOpen={showCategories}
        onClose={() => showCategories(false)}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Vehicle type
            </Text>
          </Box>
          {categories.map(item => (
            <Actionsheet.Item
              onPress={() => {
                setVehicleData({
                  ...vehicleData,
                  category_id: item.id,
                });
                setShowCategories(false);
              }}
              key={item.id}>
              {capitalize(item.name)}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
