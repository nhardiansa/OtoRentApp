import {Box, Divider, FlatList, VStack} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import BackSection from '../components/BackSection';
import Container from '../components/Container';

import {MOTORBIKE_PLACEHOLDER} from '../assets/images';
import {fontFamily, fontSize, fontStyle} from '../helpers/styleConstants';
import ItemCard from '../components/ItemCard';

export default function ViewMore({navigation}) {
  const goBack = () => {
    navigation.push();
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

  return (
    <SafeAreaView>
      <View>
        <FlatList
          ListHeaderComponent={
            <Container>
              <BackSection onPress={goBack} />
            </Container>
          }
          data={data}
          renderItem={({item}) => {
            return <ItemCard image={item.image} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
