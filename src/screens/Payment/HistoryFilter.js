import React, {useLayoutEffect, useState, useEffect} from 'react';
import {TouchableHighlight} from 'react-native';

import {
  Actionsheet,
  Box,
  FlatList,
  Heading,
  Pressable,
  Switch,
  Text,
  ScrollView,
  Button,
} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import BackSection from '../../components/BackSection';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import {useDispatch, useSelector} from 'react-redux';
import {setHistoryQuery} from '../../redux/actions/transactionActions';
import {capitalize} from '../../helpers/formatter';
import {BOTTOM_TAB, HISTORY_SCREEN} from '../../helpers/destinationConstants';

export default function HistoryFilter({navigation}) {
  const dispatch = useDispatch();
  const {vehiclesReducer, transactionReducer} = useSelector(state => state);
  const {categories} = vehiclesReducer;
  const {queryParams} = transactionReducer;

  const [showCategories, setShowCategories] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <BackSection
          onPress={() => {
            console.log('asdasd');
            navigation.replace(BOTTOM_TAB, {
              screen: HISTORY_SCREEN,
            });
          }}
        />
      ),
      headerRight: () => (
        <Button
          rounded="lg"
          onPress={resetQuery}
          isDisabled={Object.keys(queryParams).length > 0 ? false : true}
          backgroundColor={
            Object.keys(queryParams).length > 0 ? colors.primary : '#ccc'
          }
          fontFamily={fontStyle(fontFamily.primary, 'black')}>
          RESET
        </Button>
      ),
    });
  }, [navigation, queryParams]);

  useEffect(() => {
    console.log('categories', categories);
    console.log('q', queryParams);
  }, [categories, queryParams]);

  const resetQuery = () => {
    dispatch(setHistoryQuery({}));
  };

  const onChangeInput = (key, value) => {
    dispatch(
      setHistoryQuery({
        ...queryParams,
        [key]: value,
      }),
    );
  };

  const onSortChoosed = (key, value) => {
    dispatch(
      setHistoryQuery({
        ...queryParams,
        sort: {
          [key]: value,
        },
      }),
    );
  };

  const sorter = [
    {
      name: 'Recently added',
      key: 'created',
      value: 'desc',
    },
    {
      name: 'Oldest added',
      key: 'created',
      value: 'asc',
    },
  ];

  return (
    <>
      <Box px={5} py={5} bgColor={colors.white} flex={1}>
        <ScrollView showsVerticalScrollIndicator={false} flex={1}>
          <Box>
            <Heading mb="9">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                color="gray.400">
                Filter
              </Text>
            </Heading>
            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between">
              <Text
                fontSize="lg"
                color={colors.black}
                fontFamily={fontStyle(fontFamily.primary, 'semiBold')}>
                Vehicle type
              </Text>
              <Pressable
                onPress={() => setShowCategories(true)}
                flexDir="row"
                alignItems="center">
                <Text
                  color={colors.gray}
                  mr={2}
                  fontSize="lg"
                  fontFamily={fontStyle(fontFamily.primary)}>
                  {queryParams.category_id
                    ? capitalize(
                        categories.find(e => e.id === queryParams.category_id)
                          .name,
                      )
                    : 'Select type'}
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
                Already returned
              </Text>
              <Switch
                value={queryParams.returned_status === '1' ? true : false}
                offTrackColor={colors.gray}
                onTrackColor={colors.primary}
                onThumbColor={colors.white}
                onValueChange={value => {
                  if (!value) {
                    onChangeInput('returned_status', '');
                  } else {
                    onChangeInput('returned_status', '1');
                  }
                }}
                name="sorter"
              />
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
                Already paid
              </Text>
              <Switch
                value={queryParams.payment_status === '1' ? true : false}
                offTrackColor={colors.gray}
                onTrackColor={colors.primary}
                onThumbColor={colors.white}
                onValueChange={value => {
                  if (!value) {
                    onChangeInput('payment_status', '');
                  } else {
                    onChangeInput('payment_status', '1');
                  }
                }}
              />
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
                Not returned yet
              </Text>
              <Switch
                value={queryParams.returned_status === '0' ? true : false}
                offTrackColor={colors.gray}
                onTrackColor={colors.primary}
                onThumbColor={colors.white}
                onValueChange={value => {
                  if (value) {
                    onChangeInput('returned_status', '0');
                  } else {
                    onChangeInput('returned_status', '');
                  }
                }}
              />
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
                Not paid yet
              </Text>
              <Switch
                value={queryParams.payment_status === '0' ? true : false}
                offTrackColor={colors.gray}
                onTrackColor={colors.primary}
                onThumbColor={colors.white}
                onValueChange={value => {
                  if (value) {
                    onChangeInput('payment_status', '0');
                  } else {
                    onChangeInput('payment_status', '');
                  }
                }}
              />
            </Box>

            <Heading mt="10" mb="5">
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                color="gray.400">
                Sort
              </Text>
            </Heading>

            {sorter.map((item, index) => (
              <TouchableHighlight
                key={index}
                underlayColor="rgba(0,0,0,0.2)"
                onPress={() => onSortChoosed(item.key, item.value)}>
                <Box py="3" flexDir="row" alignItems="center">
                  <Text
                    fontSize="lg"
                    mr="5"
                    color={colors.black}
                    fontFamily={fontStyle(fontFamily.primary, 'semiBold')}>
                    {item.name}
                  </Text>
                  {!queryParams.sort ? (
                    <></>
                  ) : (
                    <>
                      {queryParams.sort[item.key] === item.value ? (
                        <FAIcon
                          name="check-circle"
                          size={20}
                          color={colors.green}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </Box>
              </TouchableHighlight>
            ))}
          </Box>

          <Box justifySelf="flex-end" mt="6">
            <Button
              bgColor="warning.500"
              rounded="xl"
              p="3"
              onPress={() => {
                navigation.replace(BOTTOM_TAB, {
                  screen: HISTORY_SCREEN,
                });
              }}>
              <Text
                fontFamily={fontStyle(fontFamily.primary, 'bold')}
                fontSize="lg"
                color="white">
                Apply
              </Text>
            </Button>
          </Box>
        </ScrollView>
      </Box>
      <Actionsheet
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
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
            data={categories}
            width="100%"
            renderItem={({item}) => (
              <Actionsheet.Item
                onPress={() => {
                  onChangeInput('category_id', item.id);
                  setShowCategories(false);
                }}>
                {capitalize(item.name)}
              </Actionsheet.Item>
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
