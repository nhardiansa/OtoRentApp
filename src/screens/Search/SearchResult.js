import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {
  Container,
  Box,
  Input,
  Text,
  Center,
  Pressable,
  FlatList,
} from 'native-base';
import {globalStyle} from '../../helpers/globalStyle';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../helpers/styleConstants';
import {MOTORBIKE_PLACEHOLDER} from '../../assets/images';
import ItemCard from '../../components/ItemCard';
import {VEHICLE_DETAIL} from '../../helpers/destinationConstants';

export default function SearchResult({navigation}) {
  const [search, setSearch] = useState('');

  const searchChange = e => {
    setSearch(e);
  };

  const removeHandler = () => {
    setSearch('');
  };

  const goToFilter = () => {
    console.log('goToFilter');
  };

  const goToDetail = () => {
    console.log('Go to Detail');
    navigation.navigate(VEHICLE_DETAIL);
  };

  const data = [
    {
      image: MOTORBIKE_PLACEHOLDER,
      location: 'Makassar',
      price: 250000,
      title: 'Vespa Matic',
      isAvailable: true,
    },
    {
      image: MOTORBIKE_PLACEHOLDER,
      location: 'Makassar',
      price: 250000,
      title: 'Vespa Matic',
      isAvailable: true,
    },
    {
      image: MOTORBIKE_PLACEHOLDER,
      location: 'Makassar',
      price: 250000,
      title: 'Vespa Matic',
      isAvailable: true,
    },
    {
      image: MOTORBIKE_PLACEHOLDER,
      location: 'Makassar',
      price: 250000,
      title: 'Vespa Matic',
      isAvailable: true,
    },
    {
      image: MOTORBIKE_PLACEHOLDER,
      location: 'Makassar',
      price: 250000,
      title: 'Vespa Matic',
      isAvailable: true,
    },
    {
      image: MOTORBIKE_PLACEHOLDER,
      location: 'Makassar',
      price: 250000,
      title: 'Vespa Matic',
      isAvailable: true,
    },
  ];

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
  });
  return (
    <SafeAreaView>
      <Box
        style={styles.searchWrapper}
        borderBottomWidth={1}
        w="100%"
        px="5"
        py={7}>
        <Input
          w="100%"
          value={search}
          onChangeText={searchChange}
          placeholder="Search vehicle"
          InputLeftElement={<FAIcon name="search" style={styles.searchIcon} />}
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
      <Box px="5" borderBottomColor="#F5F5F5" borderBottomWidth={1} pb="3">
        <Pressable onPress={goToFilter}>
          <Box flexDir="row" alignItems="center">
            <FAIcon name="filter" style={styles.filterIcon} />
            <Text color={colors.grayDark} fontSize="md" ml="1.5">
              Filter
            </Text>
          </Box>
        </Pressable>
      </Box>
      <Box px="5">
        <FlatList
          data={data}
          renderItem={({item}) => {
            return <ItemCard onPress={goToDetail} mb="4" image={item.image} />;
          }}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </SafeAreaView>
  );
}