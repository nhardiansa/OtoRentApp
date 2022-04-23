import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {
  Box,
  Button,
  Image as NBImage,
  Input,
  Skeleton,
  useToast,
  Text as NBText,
} from 'native-base';

import {
  HOME_BANNER,
  CAR_PLACEHOLDER,
  BIKE_PLACEHOLDER,
  MOTORBIKE_PLACEHOLDER,
} from '../assets/images';
import {fontFamily, fontSize, fontStyle} from '../helpers/styleConstants';
import {
  ADD_ITEM_SCREEN,
  ADMIN_STACK,
  VEHICLE_DETAIL,
  VIEW_MORE_SCREEN,
} from '../helpers/destinationConstants';
import LoadingScreen from '../components/LoadingScreen';

import {baseURL} from '../helpers/constants';
import {
  getVehiclesHome,
  getVehicleDetail,
} from '../redux/actions/vehicleActions';

export default function Home({navigation}) {
  const {vehiclesReducer, userReducer} = useSelector(state => state);
  const dispatch = useDispatch();

  const toast = useToast();
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    getVehicles();
  }, []);

  useEffect(() => {
    if (vehiclesReducer.error) {
      toast.show({
        description: vehiclesReducer.error,
      });
    }
  }, [vehiclesReducer]);

  useEffect(() => {
    if (vehiclesReducer.vehicle.id) {
      navigation.navigate(VEHICLE_DETAIL);
    }
  }, [vehiclesReducer.vehicle]);

  useEffect(() => {
    const loading = vehiclesReducer.loading;

    if (loading) {
      setIsRefresh(true);
    } else {
      setIsRefresh(false);
    }
  }, [vehiclesReducer.loading]);

  const getVehicles = () => {
    dispatch(getVehiclesHome());
  };

  const goToViewMore = () => {
    console.log('Go to View More');
    navigation.navigate(VIEW_MORE_SCREEN);
  };

  const goToDetail = id => {
    console.log(id);
    console.log('Go to Detail');
    dispatch(getVehicleDetail(id));
  };

  const styles = StyleSheet.create({
    banner: {
      marginBottom: 20,
    },
    text: {
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      marginRight: 11,
      lineHeight: 18,
    },
    link: {
      fontSize: fontSize.sm,
    },
    heading: {
      fontSize: fontSize.mlg,
      lineHeight: 28,
    },
    linkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionHeader: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    item: {
      minHeight: 168,
      width: 265,
      marginHorizontal: 11,
      borderRadius: 15,
    },
    listContain40er: {
      marginTop: 20,
    },
    vehicleSection: {
      marginBottom: 30,
    },
  });

  const vehicleCard = (imgSrc, id) => {
    let srcImg = imgSrc;
    if (typeof imgSrc === 'string') {
      srcImg = imgSrc.replace('http://localhost:5000', baseURL);
      srcImg = {uri: srcImg};
    }
    return (
      <Pressable onPress={() => goToDetail(id)}>
        <Image resizeMode="cover" style={styles.item} source={srcImg} />
      </Pressable>
    );
  };

  return (
    <>
      {vehiclesReducer.loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefresh}
                onRefresh={() => getVehicles()}
              />
            }>
            <Box w="full" position="relative" mb="5">
              <NBImage w="full" source={HOME_BANNER} alt="banner" />
              <Box px="5" mt="6" position="absolute" w="full">
                <Input
                  bgColor="rgba(0, 0, 0, 0.5)"
                  borderWidth="0"
                  placeholder="Search vehicle"
                  color="white"
                  placeholderTextColor="white"
                  fontFamily={fontStyle(fontFamily.primary, 'bold')}
                  fontSize="md"
                  InputRightElement={
                    <Box mr="5">
                      <Icon name="search" size={20} color="white" />
                    </Box>
                  }
                />
                {userReducer.profile?.role === 'administrator' && (
                  <Button
                    onPress={() => {
                      navigation.navigate(ADMIN_STACK, {
                        screen: ADD_ITEM_SCREEN,
                      });
                    }}
                    rounded="lg"
                    mt="3"
                    bgColor="warning.500">
                    <NBText
                      fontFamily={fontStyle(fontFamily.primary, 'bold')}
                      color="white"
                      fontSize="lg">
                      Add item
                    </NBText>
                  </Button>
                )}
              </Box>
            </Box>

            <View style={styles.contentContainer}>
              <View style={styles.vehicleSection}>
                <Box flexDir="row" justifyContent="space-between" px="5" mb="5">
                  <Text style={[styles.text, styles.heading]}>Cars</Text>
                  <TouchableOpacity
                    onPress={goToViewMore}
                    style={styles.linkContainer}>
                    <Text style={[styles.link, styles.text]}>View more</Text>
                    <Icon name="chevron-right" size={18} />
                  </TouchableOpacity>
                </Box>
                <View style={styles.container}>
                  {vehiclesReducer.loading && !vehiclesReducer.error ? (
                    <Box w="full" px="5" mt="5">
                      <Skeleton h="40" width="full" />
                    </Box>
                  ) : (
                    <FlatList
                      data={vehiclesReducer.cars}
                      renderItem={({item}) =>
                        vehicleCard(item.image || CAR_PLACEHOLDER, item.id)
                      }
                      horizontal={true}
                      contentContainerStyle={styles.listContainer}
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                </View>
              </View>
              <View style={styles.vehicleSection}>
                <Box flexDir="row" justifyContent="space-between" px="5" mb="5">
                  <Text style={[styles.text, styles.heading]}>Motorbikes</Text>
                  <TouchableOpacity
                    onPress={goToViewMore}
                    style={styles.linkContainer}>
                    <Text style={[styles.link, styles.text]}>View more</Text>
                    <Icon name="chevron-right" size={18} />
                  </TouchableOpacity>
                </Box>
                <View style={styles.container}>
                  {vehiclesReducer.loading && !vehiclesReducer.error ? (
                    <Box w="full" px="5" mt="5">
                      <Skeleton h="40" width="full" />
                    </Box>
                  ) : (
                    <FlatList
                      data={vehiclesReducer.motorcycles}
                      renderItem={({item}) =>
                        vehicleCard(
                          item.image || MOTORBIKE_PLACEHOLDER,
                          item.id,
                        )
                      }
                      horizontal={true}
                      contentContainerStyle={styles.listContainer}
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                </View>
              </View>
              <View style={styles.vehicleSection}>
                <Box flexDir="row" justifyContent="space-between" px="5" mb="5">
                  <Text style={[styles.text, styles.heading]}>Bikes</Text>
                  <TouchableOpacity
                    onPress={goToViewMore}
                    style={styles.linkContainer}>
                    <Text style={[styles.link, styles.text]}>View more</Text>
                    <Icon name="chevron-right" size={18} />
                  </TouchableOpacity>
                </Box>
                <View style={styles.container}>
                  {vehiclesReducer.loading && !vehiclesReducer.error ? (
                    <Box w="full" px="5" mt="5">
                      <Skeleton h="40" width="full" />
                    </Box>
                  ) : (
                    <FlatList
                      data={vehiclesReducer.bikes}
                      renderItem={({item}) =>
                        vehicleCard(item.image || BIKE_PLACEHOLDER, item.id)
                      }
                      horizontal={true}
                      contentContainerStyle={styles.listContainer}
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
