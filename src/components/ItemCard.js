import React from 'react';
import {Text, Image, StyleSheet, Pressable} from 'react-native';
import {Box, VStack} from 'native-base';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';

const ItemCard = ({onPress, image, styleContainer, ...containerRest}) => {
  const styles = StyleSheet.create({
    container: {
      elevation: 2,
      borderRadius: 10,
    },
    image: {
      width: '100%',
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

  return (
    <Pressable onPress={onPress}>
      <Box style={[styles.container, styleContainer]} {...containerRest}>
        <VStack>
          <Box>
            <Image source={image} style={styles.image} />
          </Box>
          <Box style={styles.detailWrapper}>
            <Box style={styles.location}>
              <Fa5Icon
                name="map-marker-alt"
                size={fontSize.lg}
                style={styles.locationIcon}
                color={colors.red}
              />
              <Text style={styles.locationText}>Makassar</Text>
            </Box>
            <Box style={styles.pricing}>
              <Box>
                <Text style={styles.title}>Vespa Matic</Text>
                <Text style={styles.isAvailable}>Available</Text>
              </Box>
              <Text style={styles.price}>
                {Number('100000').toLocaleString('id-ID')}/day
              </Text>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ItemCard;
