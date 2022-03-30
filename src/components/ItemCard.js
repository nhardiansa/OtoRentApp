import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Box, VStack} from 'native-base';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';

const ItemCard = ({image, styleContainer}) => {
  const styles = StyleSheet.create({
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
    <Box
      mx="4"
      borderWidth={1}
      borderColor="red.100"
      borderTopRadius={10}
      borderBottomRadius={10}
      style={styleContainer}>
      <VStack>
        <Box>
          <Image source={image} style={styles.image} />
        </Box>
        <Box p={4}>
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
  );
};

export default ItemCard;
