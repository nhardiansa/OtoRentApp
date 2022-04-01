import React, {useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {
  Actionsheet,
  Box,
  Button,
  Container,
  FlatList,
  Pressable,
  Switch,
  Text,
} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import BackSection from '../../components/BackSection';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';

export default function Filter({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => <BackSection onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <Button
          rounded="lg"
          backgroundColor={colors.gray}
          fontFamily={fontStyle(fontFamily.primary, 'black')}>
          RESET
        </Button>
      ),
    });
  }, [navigation]);

  const [openLocation, setOpenLocation] = useState(false);

  const [prepayment, setPrepayment] = useState(false);

  const setLocation = () => {
    setOpenLocation(true);
  };

  useEffect(() => {
    console.log('prepayment', prepayment);
    console.log('openLocation', openLocation);
  }, [openLocation, prepayment]);

  const data = [
    // 10 dummy data
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 6,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 7,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 8,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 9,
      title: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 10,
      title: 'Lorem ipsum dolor sit amet',
    },
  ];

  return (
    <>
      <Box px={5} py={5} bgColor={colors.white} flex={1}>
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between">
          <Text
            fontSize="lg"
            color={colors.black}
            fontFamily={fontStyle(fontFamily.primary, 'semiBold')}>
            Location
          </Text>
          <Pressable onPress={setLocation} flexDir="row" alignItems="center">
            <Text
              color={colors.gray}
              mr={2}
              fontSize="lg"
              fontFamily={fontStyle(fontFamily.primary)}>
              Set Location
            </Text>
            <FAIcon name="chevron-right" size={20} color={colors.gray} />
          </Pressable>
        </Box>
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          mt={8}>
          <Text
            fontSize="lg"
            color={colors.black}
            fontFamily={fontStyle(fontFamily.primary, 'semiBold')}>
            No Prepayment
          </Text>
          {/* <Pressable onPress={setLocation} flexDir="row" alignItems="center">
            <Text
              color={colors.gray}
              mr={2}
              fontSize="lg"
              fontFamily={fontStyle(fontFamily.primary)}>
              Set Location
            </Text>
            <FAIcon name="chevron-right" size={20} color={colors.gray} />
          </Pressable> */}
          <Switch
            offTrackColor={colors.gray}
            onTrackColor={colors.primary}
            onThumbColor={colors.white}
            value={prepayment}
            onValueChange={v => setPrepayment(v)}
          />
        </Box>
      </Box>
      <Actionsheet
        isOpen={openLocation}
        onClose={() => setOpenLocation(false)}
        hideDragIndicator>
        <Actionsheet.Content borderTopRadius="0">
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Select Location
            </Text>
          </Box>
          <FlatList
            data={data}
            width="100%"
            renderItem={({item}) => (
              <Actionsheet.Item onPress={() => setOpenLocation(false)}>
                Delete
              </Actionsheet.Item>
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
