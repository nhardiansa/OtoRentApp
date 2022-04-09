import React, {useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {
  Actionsheet,
  Box,
  Button,
  Container,
  FlatList,
  Heading,
  Input,
  Pressable,
  Switch,
  Text,
  ScrollView,
  FormControl,
} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import BackSection from '../../components/BackSection';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import {useDispatch, useSelector} from 'react-redux';
import {setQuery} from '../../redux/actions/vehicleActions';
import {capitalize} from '../../helpers/formatter';
import {SEARCH_SCREEN} from '../../helpers/destinationConstants';

export default function Filter({navigation}) {
  const dispatch = useDispatch();
  const {categories, locations, query} = useSelector(
    state => state.vehiclesReducer,
  );

  const resetQuery = () => {
    const vehicleName = query.vehicle_name ? query.vehicle_name : '';
    dispatch(
      setQuery({
        vehicle_name: vehicleName,
      }),
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <BackSection
          onPress={() => {
            navigation.replace(SEARCH_SCREEN);
          }}
        />
      ),
      headerRight: () => (
        <Button
          rounded="lg"
          onPress={resetQuery}
          isDisabled={Object.keys(query).length > 1 ? false : true}
          backgroundColor={
            Object.keys(query).length > 1 ? colors.primary : '#ccc'
          }
          fontFamily={fontStyle(fontFamily.primary, 'black')}>
          RESET
        </Button>
      ),
    });
  }, [navigation, query]);

  const [showLocations, setShowLocations] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    if (!query.vehicle_name) {
      dispatch(
        setQuery({
          ...query,
          vehicle_name: '',
        }),
      );
    }
  }, []);

  const onChangeInput = (value, field) => {
    if (field === 'prepayment') {
      if (!value) {
        dispatch(
          setQuery({
            ...query,
            [field]: '',
          }),
        );
        return;
      }
    }

    dispatch(
      setQuery({
        ...query,
        [field]: value,
      }),
    );
  };

  const onSorterChange = (value, field, order) => {
    if (!value) {
      dispatch(setQuery({...query, sorter: {}}));
    } else {
      dispatch(setQuery({...query, sorter: {[field]: order}}));
    }
  };

  const setLocation = value => {
    dispatch(setQuery({...query, location: value}));
    setShowLocations(false);
  };

  const setPrice = (value, field) => {
    if (!isNaN(value)) {
      if (parseInt(value) < 1) {
        onChangeInput('1', field);
        return;
      }

      onChangeInput(value, field);
    }
  };

  return (
    <>
      <Box px={5} py={5} bgColor={colors.white} flex={1}>
        <ScrollView showsVerticalScrollIndicator={false} flex={1}>
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
              Location
            </Text>
            <Pressable
              onPress={() => setShowLocations(true)}
              flexDir="row"
              alignItems="center">
              <Text
                color={colors.gray}
                mr={2}
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {query.location ? capitalize(query.location) : 'Set Location'}
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
              Type
            </Text>
            <Pressable
              onPress={() => setShowCategory(true)}
              flexDir="row"
              alignItems="center">
              <Text
                color={colors.gray}
                mr={2}
                fontSize="lg"
                fontFamily={fontStyle(fontFamily.primary)}>
                {query.category_id
                  ? capitalize(
                      categories.find(e => e.id === query.category_id).name,
                    )
                  : 'Choose Type'}
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
            <Switch
              offTrackColor={colors.gray}
              onTrackColor={colors.primary}
              onThumbColor={colors.white}
              value={query.prepayment ? true : false}
              onValueChange={v => onChangeInput(v, 'prepayment')}
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
              Min price
            </Text>
            <Input
              value={query.minPrice || ''}
              onChangeText={v => setPrice(v, 'minPrice')}
              keyboardType="numeric"
              placeholder="10000"
              minWidth="2/5"
              borderBottomWidth="1"
              borderColor="gray.300"
              variant="underlined"
              bgColor="white"
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
              Max price
            </Text>
            <Input
              value={query.minPrice || ''}
              onChangeText={v => setPrice(v, 'maxPrice')}
              keyboardType="numeric"
              placeholder="10000"
              minWidth="2/5"
              borderBottomWidth="1"
              borderColor="gray.300"
              variant="underlined"
              bgColor="white"
            />
          </Box>

          <Heading my="10">
            <Text
              fontFamily={fontStyle(fontFamily.primary, 'bold')}
              color="gray.400">
              Sort
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
              Most Expensive
            </Text>
            <Switch
              offTrackColor={colors.gray}
              onTrackColor={colors.primary}
              onThumbColor={colors.white}
              name="sorter"
              onValueChange={v => onSorterChange(v, 'sort_price', 'desc')}
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
              Cheapest
            </Text>
            <Switch
              offTrackColor={colors.gray}
              onTrackColor={colors.primary}
              onThumbColor={colors.white}
              name="sorter"
              onValueChange={v => onSorterChange(v, 'sort_price', 'asc')}
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
              Most Popular
            </Text>
            <Switch
              offTrackColor={colors.gray}
              onTrackColor={colors.primary}
              onThumbColor={colors.white}
              name="sorter"
              onValueChange={v => onSorterChange(v, 'popularity', 'desc')}
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
              Recently Added
            </Text>
            <Switch
              offTrackColor={colors.gray}
              onTrackColor={colors.primary}
              onThumbColor={colors.white}
              name="sorter"
              onValueChange={v => onSorterChange(v, 'created', 'desc')}
            />
          </Box>
        </ScrollView>
      </Box>
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
              Select Location
            </Text>
          </Box>
          <FlatList
            data={locations}
            width="100%"
            renderItem={({item}) => (
              <Actionsheet.Item onPress={() => setLocation(item.location)}>
                {capitalize(item.location)}
              </Actionsheet.Item>
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>
      <Actionsheet
        isOpen={showCategory}
        onClose={() => setShowCategory(false)}
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
                  onChangeInput(item.id, 'category_id');
                  setShowCategory(false);
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
