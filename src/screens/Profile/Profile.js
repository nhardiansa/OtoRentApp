import React, {useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native';
import {Box, Button, Image, Modal, Text} from 'native-base';
import PushNotification from 'react-native-push-notification';

import {PROFILE_PLACEHOLDER} from '../../assets/images';
import {fontFamily, fontStyle} from '../../helpers/styleConstants';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../redux/actions/authActions';
import {normalizeUrl} from '../../helpers/formatter';
import {UPDATE_PROFILE} from '../../helpers/destinationConstants';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const {profile: user} = useSelector(state => state.userReducer);

  const [showModal, setShowModal] = useState(false);
  const [profilePlaceholder, setProfilePlaceholder] =
    useState(PROFILE_PLACEHOLDER);

  const [errorImage, setErrorImage] = useState(false);

  useEffect(() => {
    console.log(profilePlaceholder);

    PushNotification.createChannel({
      channelId: 'test-channel-id',
      channelName: 'test-channel',
    });

    PushNotification.getChannels(channels => {
      console.log(channels);
    });

    if (errorImage) {
      setProfilePlaceholder(PROFILE_PLACEHOLDER);
      setErrorImage(false);
      return;
    }

    if (user) {
      if (user.image) {
        setProfilePlaceholder(normalizeUrl(user.image));
      } else {
        setProfilePlaceholder(PROFILE_PLACEHOLDER);
      }
    } else {
      setProfilePlaceholder(PROFILE_PLACEHOLDER);
    }
  }, [user, errorImage]);

  const pressed = () => {
    console.log('asdasd');
  };

  const goToUpdateProfile = () => {
    if (user) {
      navigation.navigate(UPDATE_PROFILE);
    }
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  const errorLoadImage = ({nativeEvent: {error}}) => {
    console.log('failed load image', error, error.code);
    // setProfilePlaceholder(PROFILE_PLACEHOLDER);
    setErrorImage(true);
  };

  const remoteNotificationHandler = async () => {
    console.log('remote notification');
  };

  const localNotificationHandler = () => {
    PushNotification.localNotification({
      channelId: 'test-channel-id',
      message: 'ngetest doang',
      title: 'Test',
    });
  };

  const btnAction = [
    {
      text: 'Your Favorites',
      action: pressed,
    },
    {
      text: 'FAQ',
      action: pressed,
    },
    {
      text: 'Help',
      action: pressed,
    },
    {
      text: 'Remote notification',
      action: remoteNotificationHandler,
    },
    {
      text: 'Local notification',
      action: localNotificationHandler,
    },
    {
      text: 'Update Profile',
      action: goToUpdateProfile,
    },
  ];

  return (
    <>
      <Box flex={1}>
        <Box
          px="5"
          pt="9"
          pb="5"
          flexDir="row"
          alignItems="center"
          bgColor="white">
          <Image
            alt="profile"
            source={profilePlaceholder}
            onError={errorLoadImage}
            mr="7"
            rounded="full"
            w="16"
            h="16"
          />
          <Text
            fontFamily={fontStyle(fontFamily.primary, 'bold')}
            fontSize="2xl">
            {user?.name}
          </Text>
        </Box>
        <Box h="4/5" justifyContent="space-between">
          <Box>
            <Box>
              {btnAction.map((btn, index) => (
                <TouchableHighlight
                  key={index}
                  onPress={btn.action}
                  underlayColor="rgba(0,0,0,0.2)">
                  <Box
                    px="5"
                    py="6"
                    flexDir="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text
                      fontSize="xl"
                      fontFamily={fontStyle(fontFamily.primary, 'semiBold')}>
                      {btn.text}
                    </Text>
                    <FAIcon name="chevron-right" size={16} />
                  </Box>
                </TouchableHighlight>
              ))}
            </Box>
          </Box>
          <Box px="5">
            <Button
              p="4"
              rounded="2xl"
              bgColor="warning.500"
              onPress={() => setShowModal(true)}>
              <Box flexDir="row" alignItems="center">
                <Text
                  color="white"
                  mr="3"
                  fontSize="xl"
                  fontFamily={fontStyle(fontFamily.primary, 'semiBold')}>
                  Logout
                </Text>
                <EIcon color="white" name="log-out" size={20} />
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Are you sure?</Modal.Header>
          <Modal.Body>
            <Text>Are you sure you want to log out?</Text>
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
                  onLogOut();
                }}>
                Logout
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
