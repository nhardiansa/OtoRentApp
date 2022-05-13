import React, {useLayoutEffect, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import {Box, FlatList} from 'native-base';

import {capitalize} from '../helpers/formatter';
import ItemCard from '../components/ItemCard';
import BackSection from '../components/BackSection';
import LoadingScreen from '../components/LoadingScreen';

import {axiosInstance} from '../helpers/http';
import qs from 'query-string';
import {useDispatch, useSelector} from 'react-redux';
import {VEHICLE_DETAIL} from '../helpers/destinationConstants';
import {getVehicleDetail} from '../redux/actions/vehicleActions';

export default function ViewMore({route, navigation}) {
  const {type} = route.params;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: true,
      headerLeft: () => <BackSection onPress={goBack} />,
      headerRight: () => null,
    });
  }, [navigation, goBack]);

  const {vehicle: vehicleDetail, loading: vehicleDetailLoading} = useSelector(
    state => state.vehiclesReducer,
  );

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({});
  const [onRefresh, setOnRefresh] = useState(false);

  useEffect(() => {
    switch (type) {
      case 'car': {
        getVehicleList(2);
        break;
      }
      case 'motorbike': {
        getVehicleList(3);
        break;
      }
      case 'bike': {
        getVehicleList(4);
        break;
      }
      default:
        goBack();
        break;
    }
  }, [type, onRefresh]);

  useEffect(() => {
    if (vehicleDetail.id) {
      navigation.navigate(VEHICLE_DETAIL);
    }
  }, [vehicleDetail]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToDetail = id => {
    console.log('Go to Detail', id);
    dispatch(getVehicleDetail(id));
  };

  const getVehicleList = async (categoryId, loadMore = false) => {
    try {
      setLoading(true);
      const params = {
        category_id: categoryId,
      };

      let result;

      if (loadMore) {
        const {data} = await axiosInstance(null, false).get(pageInfo.nextPage);
        data.results = [...vehicles, ...data.results];
        result = data;
      } else {
        const {data} = await axiosInstance().get(
          `/vehicles/filter?${qs.stringify(params)}`,
        );
        result = data;
      }
      setVehicles(result.results);
      setPageInfo(result.pageInfo);
      console.log(result.pageInfo);
      setLoading(false);
      setOnRefresh(false);
      console.log('new data is coming');
    } catch (err) {
      console.error(err);
      goBack();
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
  });

  return (
    <SafeAreaView>
      <View>
        {(loading && vehicles.length < 1) || vehicleDetailLoading ? (
          <Box h="full" alignItems="center" justifyContent="center">
            <LoadingScreen />
          </Box>
        ) : (
          <>
            {/* {vehicleDetailLoading ? (
              <Box h="full" alignItems="center" justifyContent="center">
                <LoadingScreen title="Getting Vehicle" />
              </Box>
            ) : (
              <></>
            )} */}
            <FlatList
              refreshing={onRefresh}
              onRefresh={() => setOnRefresh(true)}
              contentContainerStyle={styles.container}
              data={vehicles}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (pageInfo.nextPage) {
                  getVehicleList(null, true);
                }
              }}
              renderItem={({item}) => {
                return (
                  <ItemCard
                    vehicleType={type}
                    name={capitalize(item.name)}
                    price={item.price}
                    location={capitalize(item.location)}
                    onPress={() => goToDetail(item.id)}
                    mb="4"
                    image={item.image}
                  />
                );
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
