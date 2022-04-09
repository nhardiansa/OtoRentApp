import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {
  Container,
  Box,
  Input,
  Text,
  Center,
  Pressable,
  FlatList,
  Button,
} from 'native-base';

import {capitalize} from '../../helpers/formatter';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {colors, fontFamily, fontStyle} from '../../helpers/styleConstants';
import ItemCard from '../../components/ItemCard';
import {
  FILTER_SCREEN,
  SEARCH_SCREEN,
  VEHICLE_DETAIL,
} from '../../helpers/destinationConstants';
import {useDispatch, useSelector} from 'react-redux';
import LoadingScreen from '../../components/LoadingScreen';
import {
  loadMoreVehicles,
  setQuery,
  setVehicleList,
  getVehicleDetail,
} from '../../redux/actions/vehicleActions';

export default function SearchResult({navigation}) {
  const [search, setSearch] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const {
    vehicles: data,
    pageInfo,
    loading,
    error,
    query,
    loadMoreLoading,
    vehicle,
  } = useSelector(state => state.vehiclesReducer);

  useEffect(() => {
    dispatch(setVehicleList(query));
  }, []);

  useEffect(() => {
    if (vehicle.id) {
      navigation.navigate(VEHICLE_DETAIL, {
        screen: SEARCH_SCREEN,
      });
    }
  }, [vehicle]);

  const searchChange = e => {
    dispatch(
      setQuery({
        ...query,
        vehicle_name: e,
      }),
    );
  };

  const endEditingHandler = e => {
    dispatch(setVehicleList(query));
  };

  const removeHandler = () => {
    setSearch('');
  };

  const loadMoreHandler = () => {
    dispatch(loadMoreVehicles(pageInfo.nextPage));
  };

  const goToFilter = () => {
    console.log('goToFilter');
    navigation.replace(FILTER_SCREEN);
  };

  const goToDetail = id => {
    dispatch(getVehicleDetail(id));
  };

  const styles = StyleSheet.create({
    searchIcon: {
      marginLeft: 16,
      fontSize: 20,
    },
    removeIcon: {
      marginRight: 16,
      fontSize: 16,
    },
    searchWrapper: {
      borderBottomColor: '#F5F5F5',
    },
    filterIcon: {
      fontSize: 20,
      color: colors.gray,
    },
    listContainer: {
      paddingBottom: 280,
    },
  });

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box>
          <Box
            style={styles.searchWrapper}
            borderBottomWidth={1}
            w="100%"
            px="5"
            py={6}>
            <Input
              w="100%"
              value={query.vehicle_name || ''}
              onChangeText={searchChange}
              onEndEditing={endEditingHandler}
              placeholder="Search vehicle"
              InputLeftElement={
                <FAIcon name="search" style={styles.searchIcon} />
              }
              InputRightElement={
                search ? (
                  <FAIcon
                    onPress={removeHandler}
                    name="remove"
                    style={styles.removeIcon}
                  />
                ) : null
              }
            />
          </Box>
          <Box px="5" borderBottomColor="#F5F5F5" borderBottomWidth={1}>
            <Pressable onPress={goToFilter}>
              <Box flexDir="row" alignItems="center">
                <FAIcon name="filter" style={styles.filterIcon} />
                <Text color={colors.grayDark} fontSize="md" ml="1.5">
                  Filter
                </Text>
              </Box>
            </Pressable>
          </Box>
          {!loading && (
            <Box px="5">
              {data.length > 0 ? (
                <FlatList
                  mt={5}
                  contentContainerStyle={styles.listContainer}
                  ListFooterComponent={
                    pageInfo.nextPage && (
                      <Button
                        onPress={loadMoreHandler}
                        py="3"
                        bgColor="warning.500"
                        rounded="lg"
                        isLoading={loadMoreLoading}>
                        <Text
                          color="white"
                          fontSize="md"
                          fontFamily={fontStyle(fontFamily.primary, 'bold')}>
                          Load More
                        </Text>
                      </Button>
                    )
                  }
                  data={data}
                  renderItem={({item}) => {
                    console.log(item.type);
                    return (
                      <ItemCard
                        onPress={() => goToDetail(item.id)}
                        mb="4"
                        name={capitalize(item.name)}
                        image={item.image}
                        location={capitalize(item.location)}
                        price={item.price}
                        vehicleType={item.type}
                      />
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <Box
                  w="full"
                  h="4/5"
                  justifyContent="center"
                  alignItems="center">
                  <Text
                    fontFamily={fontStyle(fontFamily.primary, 'bold')}
                    color="gray.400"
                    fontSize="2xl">
                    Vehicle not found
                  </Text>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
