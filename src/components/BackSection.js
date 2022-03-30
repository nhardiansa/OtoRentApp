import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {fontFamily, fontSize, fontStyle} from '../helpers/styleConstants';

export default function BackSection({onPress}) {
  const styles = StyleSheet.create({
    text: {
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
      fontSize: fontSize.mlg,
      marginStart: 11,
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
        <Fa5Icon name="chevron-left" size={24} />
        <Text style={styles.text}>Back</Text>
      </View>
    </TouchableOpacity>
  );
}
