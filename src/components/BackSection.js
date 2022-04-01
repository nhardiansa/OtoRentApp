import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';

export default function BackSection({onPress, textStyle, iconStyle}) {
  const styles = StyleSheet.create({
    text: {
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      fontSize: fontSize.mlg,
      marginStart: 11,
      color: colors.black,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.outerContainer}>
      <View style={styles.container}>
        <Fa5Icon
          name="chevron-left"
          style={iconStyle}
          size={24}
          color={colors.black}
        />
        <Text style={[styles.text, textStyle]}>Back</Text>
      </View>
    </TouchableOpacity>
  );
}
