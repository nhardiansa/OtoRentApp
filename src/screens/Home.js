import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import CustomTextInput from '../components/CustomTextInput';
import Container from '../components/Container';
import {HOME_BANNER, CAR_PLACEHOLDER, BIKE_PLACEHOLDER} from '../assets/images';
import {fontFamily, fontSize, fontStyle} from '../helpers/styleConstants';
import {
  VEHICLE_DETAIL,
  VIEW_MORE_SCREEN,
} from '../helpers/destinationConstants';

export default function Home({navigation}) {
  const vehicles = [
    {
      id: 1,
      src: CAR_PLACEHOLDER,
    },
    {
      id: 2,
      src: CAR_PLACEHOLDER,
    },
  ];

  const bikes = [
    {
      id: 1,
      src: BIKE_PLACEHOLDER,
    },
    {
      id: 2,
      src: BIKE_PLACEHOLDER,
    },
  ];

  const goToViewMore = () => {
    console.log('Go to View More');
    navigation.navigate(VIEW_MORE_SCREEN);
  };

  const goToDetail = () => {
    console.log('Go to Detail');
    navigation.navigate(VEHICLE_DETAIL);
  };

  const styles = StyleSheet.create({
    banner: {
      minHeight: '30%',
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
    listContainer: {
      marginTop: 20,
    },
    vehicleSection: {
      marginBottom: 30,
    },
    contentContainer: {
      paddingBottom: '60%',
    },
  });

  const vehicleCard = vehicle => {
    return (
      <Pressable onPress={goToDetail}>
        <Image resizeMode="cover" style={styles.item} source={vehicle} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={HOME_BANNER}
          style={styles.banner}
          resizeMode={'cover'}>
          <Container>
            <CustomTextInput placeholder="Search vehicle " />
          </Container>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <View style={styles.vehicleSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.text, styles.heading]}>Cars</Text>
              <TouchableOpacity
                onPress={goToViewMore}
                style={styles.linkContainer}>
                <Text style={[styles.link, styles.text]}>View more</Text>
                <Icon name="chevron-right" size={18} />
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <FlatList
                data={vehicles}
                renderItem={({item}) => vehicleCard(item.src)}
                horizontal={true}
                contentContainerStyle={styles.listContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={styles.vehicleSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.text, styles.heading]}>Motorbikes</Text>
              <TouchableOpacity style={styles.linkContainer}>
                <Text style={[styles.link, styles.text]}>View more</Text>
                <Icon name="chevron-right" size={18} />
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <FlatList
                data={vehicles}
                renderItem={({item}) => vehicleCard(item.src)}
                horizontal={true}
                contentContainerStyle={styles.listContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={styles.vehicleSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.text, styles.heading]}>Bikes</Text>
              <TouchableOpacity style={styles.linkContainer}>
                <Text style={[styles.link, styles.text]}>View more</Text>
                <Icon name="chevron-right" size={18} />
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <FlatList
                data={bikes}
                renderItem={({item}) => vehicleCard(item.src)}
                horizontal={true}
                contentContainerStyle={styles.listContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
