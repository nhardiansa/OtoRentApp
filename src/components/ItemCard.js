import React, {useEffect, useState} from 'react';
import {Text, Image, StyleSheet, Pressable} from 'react-native';
import {Box, VStack} from 'native-base';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';

import {
  MOTORBIKE_PLACEHOLDER,
  CAR_PLACEHOLDER,
  BIKE_PLACEHOLDER,
} from '../assets/images';
import {normalizeUrl} from '../helpers/formatter';

const ItemCard = ({
  onPress,
  name,
  image,
  styleContainer,
  location,
  vehicleType,
  price,
  ...containerRest
}) => {
  const styles = StyleSheet.create({
    container: {
      elevation: 2,
      borderRadius: 10,
    },
    image: {
      width: '100%',
      minHeight: 168,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    location: {
      fontSize: fontSize.md,
      fontFamily: fontStyle(fontFamily.primary, 'medium'),
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 7,
    },
    locationIcon: {
      marginRight: 10,
    },
    locationText: {
      fontSize: fontSize.md,
    },
    detailWrapper: {
      padding: 10,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
      backgroundColor: colors.white,
    },
    pricing: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: fontSize.mlg,
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      color: colors.black,
    },
    isAvailable: {
      fontSize: fontSize.md,
      fontFamily: fontStyle(fontFamily.primary, 'medium'),
      color: colors.green,
    },
    price: {
      fontSize: fontSize.lg,
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      color: colors.black,
    },
  });

  const [vehicleImage, setVehicleImage] = useState(CAR_PLACEHOLDER);

  useEffect(() => {
    if (image) {
      setVehicleImage(normalizeUrl(image));
      return;
    }
    switch (vehicleType) {
      case 'motorbike': {
        setVehicleImage(MOTORBIKE_PLACEHOLDER);
        break;
      }
      case 'bike': {
        setVehicleImage(BIKE_PLACEHOLDER);
        break;
      }
      default: {
        setVehicleImage(CAR_PLACEHOLDER);
      }
    }
  }, [vehicleType]);

  return (
    <Pressable onPress={onPress}>
      <Box style={[styles.container, styleContainer]} {...containerRest}>
        <VStack>
          <Box>
            <Image source={vehicleImage} style={styles.image} />
          </Box>
          <Box style={styles.detailWrapper}>
            <Box style={styles.location}>
              <Fa5Icon
                name="map-marker-alt"
                size={fontSize.lg}
                style={styles.locationIcon}
                color={colors.red}
              />
              <Text style={styles.locationText}>{location}</Text>
            </Box>
            <Box style={styles.pricing}>
              <Box>
                <Text style={styles.title}>{name || 'Unknown'}</Text>
                <Text style={styles.isAvailable}>Available</Text>
              </Box>
              <Text style={styles.price}>
                Rp. {Number(price).toLocaleString('id-ID')}/day
              </Text>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ItemCard;
