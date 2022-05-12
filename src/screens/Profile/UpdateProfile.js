import {} from 'react-native';
import {
  Box,
  Button,
  Image,
  Input,
  Pressable,
  Radio,
  ScrollView,
  Text,
  Modal,
  useToast,
} from 'native-base';
import React, {useLayoutEffect, useState} from 'react';

import BackSection from '../../components/BackSection';
import {useDispatch, useSelector} from 'react-redux';

import {PROFILE_PLACEHOLDER} from '../../assets/images';
import FIcon from 'react-native-vector-icons/Feather';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import {normalizeUrl} from '../../helpers/formatter';
import moment from 'moment';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {
  launchImageLibrary as ImagePicker,
  launchCamera as pickImageByCamera,
} from 'react-native-image-picker';
import {useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {updateUserProfile} from '../../redux/actions/userActions';

import LoadingScreen from '../../components/LoadingScreen';
import {clearProcessError} from '../../redux/actions/processActions';
import {PROFILE_SCREEN} from '../../helpers/destinationConstants';

export default function UpdateProfile({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => (
        <BackSection title="Profile" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const toast = useToast();
  const dispatch = useDispatch();
  const {profile: user} = useSelector(state => state.userReducer);
  const {user: auth} = useSelector(state => state.authReducer);
  const {loading: processLoading, error: processError} = useSelector(
    state => state.processReducer,
  );

  const [birthDate, setBirthDate] = useState(user.birthdate);
  const [changesData, setChangesData] = useState({
    name: '',
    phone: '',
    birthdate: '',
    address: '',
    gender: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [imageProfile, setImageProfile] = useState(PROFILE_PLACEHOLDER);

  const [errorLoadImage, setErrorLoadImage] = useState(false);

  const showDateTimePicker = async () => {
    DateTimePickerAndroid.open({
      value: birthDate ? new Date(birthDate) : new Date(),
      onChange: dateChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  useEffect(() => {
    if (processError) {
      setErrorModal(true);
      const id = 'update_profile_error';
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: 'Failed to update profile',
          description: processError,
          status: 'error',
          duration: 3000,
          placement: 'bottom',
        });
      }
    }

    if (!user) {
      navigation.replace(PROFILE_SCREEN);
    }
  }, [processError, processLoading, user]);

  useEffect(() => {
    if (errorLoadImage) {
      setImageProfile(PROFILE_PLACEHOLDER);
      setErrorLoadImage(false);
    }
  }, [errorLoadImage]);

  useEffect(() => {
    if (changesData.image) {
      setImageProfile({uri: changesData.image.uri});
      return;
    }

    if (user.image) {
      setImageProfile(normalizeUrl(user.image));
    }

    return () => {
      dispatch(clearProcessError());
    };
  }, [changesData]);

  const dateChange = async (event, date) => {
    if (event.type === 'set') {
      const userBirthdate = moment(user.birthdate).format('DD-MM-YYYY');
      const newBirthDate = moment(date).format('DD-MM-YYYY');

      if (newBirthDate === userBirthdate) {
        setChangesData({
          ...changesData,
          birthdate: '',
        });
      } else {
        setChangesData({
          ...changesData,
          birthdate: newBirthDate,
        });
      }
      setBirthDate(date);
    }
  };

  const onChange = (value, field) => {
    console.log('field', field);
    console.log('value', value);

    if (field === 'birthdate') {
      if (value === moment(user.birthdate).format('DD-MM-YYYY')) {
        setChangesData({
          ...changesData,
          birthdate: '',
        });
      }
    }

    if (value === user[field]) {
      setChangesData({
        ...changesData,
        [field]: '',
      });
    } else {
      setChangesData({
        ...changesData,
        [field]: value,
      });
    }
  };

  const showImagePicker = async (useCamera = false) => {
    try {
      let response;
      if (useCamera) {
        response = await pickImageByCamera({});
      } else {
        response = await ImagePicker({});
      }
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
      setChangesData({
        ...changesData,
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

  const saveChangesHandler = () => {
    const dataToSend = [];
    for (const key in changesData) {
      if (changesData[key]) {
        if (key === 'image') {
          dataToSend.push({
            name: 'image',
            filename: changesData.image.name,
            data: changesData.image.data,
            type: changesData.image.type,
          });
        } else {
          dataToSend.push({
            name: key,
            data: changesData[key],
          });
        }
      }
    }

    if (!dataToSend.length) {
      const id = 'no_changes';
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: 'Warning',
          description: 'No changes to save',
          status: 'warning',
          duration: 3000,
          placement: 'bottom',
        });
      }
      return;
    }
    const dataCollection = {
      userId: user.id,
      dataToSend,
    };

    // console.log('dataCollection', dataCollection);
    dispatch(updateUserProfile(dataCollection, auth.token));
  };

  const errorLoadingImage = ({nativeEvent, target}) => {
    const {error} = nativeEvent;

    console.log(target);

    if (error) {
      setErrorLoadImage(true);
    }
  };

  return (
    <>
      {processLoading || processError ? (
        <LoadingScreen />
      ) : (
        <ScrollView flex={1} bgColor="white">
          <Box px="5" pt="8">
            <Box alignItems="center">
              <Box position="relative" p="2">
                <Image
                  source={imageProfile}
                  onError={errorLoadingImage}
                  h="24"
                  w="24"
                  rounded="full"
                  alt="profileImage"
                />
                {/* <Pressable
                  onPress={() => showImagePicker(false)}
                  position="absolute"
                  bottom="0"
                  right="0">
                  <Box bgColor="warning.500" p="3" rounded="full">
                    <FIcon color={colors.white} name="edit-2" size={20} />
                  </Box>
                </Pressable> */}
              </Box>
              <Button
                mt="4"
                px="5"
                borderRadius="xl"
                bgColor="muted.600"
                onPress={() => showImagePicker(true)}
                w="3/5">
                <Box flexDir="row" alignItems="center">
                  <FIcon name="camera" size={30} color={colors.white} />
                  <Text
                    ml="2.5"
                    color="white"
                    fontFamily={fontStyle(fontFamily.primary, 'bold')}
                    fontSize="lg">
                    Take photo
                  </Text>
                </Box>
              </Button>
              <Button
                my="3"
                px="5"
                borderRadius="xl"
                bgColor="warning.600"
                onPress={() => showImagePicker(false)}
                w="3/5">
                <Box flexDir="row" alignItems="center">
                  <FIcon name="upload" size={30} color={colors.white} />
                  <Text
                    ml="2.5"
                    color="white"
                    fontFamily={fontStyle(fontFamily.primary, 'bold')}
                    fontSize="lg">
                    Upload photo
                  </Text>
                </Box>
              </Button>
            </Box>
            <Box alignItems="center" mt="5">
              <Radio.Group
                onChange={e => onChange(e, 'gender')}
                defaultValue={user.gender}
                name="gender"
                flexDir="row">
                <Radio value="female" colorScheme="warning" size="lg" mr="7">
                  Female
                </Radio>
                <Radio value="male" colorScheme="warning" size="lg">
                  Male
                </Radio>
              </Radio.Group>
            </Box>
            <Box mt="6">
              <Box>
                <Text
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  color="gray.400"
                  mb="2"
                  fontSize="sm">
                  Name :
                </Text>
                <Input
                  placeholder="Jane Doe"
                  defaultValue={user.name}
                  bgColor="white"
                  onChangeText={value => onChange(value, 'name')}
                />
              </Box>
              <Box mt="6">
                <Text
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  color="gray.400"
                  mb="2"
                  fontSize="sm">
                  Email Address :
                </Text>
                <Input
                  isDisabled={true}
                  defaultValue={user.email}
                  bgColor="gray.100"
                />
              </Box>
              <Box mt="6">
                <Text
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  color="gray.400"
                  mb="2"
                  fontSize="sm">
                  Phone Number :
                </Text>
                <Input
                  placeholder="08212345678"
                  defaultValue={user.phone}
                  bgColor="white"
                  onChangeText={value => onChange(value, 'phone')}
                />
              </Box>
              <Box mt="6">
                <Text
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  color="gray.400"
                  mb="2"
                  fontSize="sm">
                  Date of Birth :
                </Text>
                <Input
                  defaultValue={moment(user.birthdate).format('YYYY-MM-DD')}
                  value={moment(birthDate).format('YYYY-MM-DD')}
                  isDisabled={true}
                  bgColor="white"
                  placeholder="YYYY-MM-DD"
                  rightElement={
                    <Pressable onPress={showDateTimePicker}>
                      <Box mr="4">
                        <FIcon
                          name="calendar"
                          color={colors.grayDark}
                          size={30}
                        />
                      </Box>
                    </Pressable>
                  }
                />
              </Box>
              <Box mt="6">
                <Text
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  color="gray.400"
                  mb="2"
                  fontSize="sm">
                  Delivery Address :
                </Text>
                <Input
                  defaultValue={user.address}
                  placeholder="Jl. Kebon Jeruk No.1"
                  bgColor="white"
                  onChangeText={value => onChange(value, 'address')}
                />
              </Box>
            </Box>
            <Box my="10">
              <Button
                onPress={saveChangesHandler}
                p="4"
                rounded="2xl"
                bgColor="warning.500">
                <Text
                  color="white"
                  fontSize="xl"
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}>
                  Save Changes
                </Text>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Are you sure?</Modal.Header>
          <Modal.Body>
            <Text>Are you sure you want to edit your profile?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                bgColor="warning.500"
                onPress={() => {
                  setShowModal(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={errorModal} onClose={() => setErrorModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header> Failed update Profile </Modal.Header>
          <Modal.Body>
            <Text>{processError}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                bgColor="warning.500"
                onPress={() => {
                  setErrorModal(false);
                  navigation.goBack();
                }}>
                Back to Profile
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
