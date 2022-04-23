import React, {useLayoutEffect, useCallback} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import {FlatList} from 'native-base';

import {MOTORBIKE_PLACEHOLDER} from '../assets/images';
import ItemCard from '../components/ItemCard';
import BackSection from '../components/BackSection';

export default function ViewMore({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: true,
      headerLeft: () => <BackSection onPress={goBack} />,
      headerRight: () => null,
    });
  }, [navigation, goBack]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToDetail = () => {
    console.log('Go to Detail');
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
    container: {
      padding: 20,
    },
  });

  return (
    <SafeAreaView>
      <View>
        <FlatList
          contentContainerStyle={styles.container}
          data={data}
          renderItem={({item}) => {
            return <ItemCard onPress={goToDetail} mb="4" image={item.image} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
