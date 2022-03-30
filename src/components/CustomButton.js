import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';

export default function CustomButton({
  children,
  onPress,
  variant,
  variantText,
  styleContainer,
  styleText,
}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors[variant || 'primary'],
      padding: 13,
      borderRadius: 10,
    },
    textBtn: {
      fontSize: fontSize.lg,
      textAlign: 'center',
      color: colors[variantText || 'white'],
      fontFamily: fontStyle(fontFamily.primary, 'bold'),
    },
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.button, styleContainer]}>
        <Text style={[styles.textBtn, styleText]}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
