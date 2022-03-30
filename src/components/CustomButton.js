import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
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
    <View style={[styleContainer]}>
      <TouchableHighlight
        style={styles.button}
        underlayColor={variant ? colors[variant + 'Dark'] : colors.primaryDark}
        onPress={onPress}>
        <Text style={[styles.textBtn, styleText]}>{children}</Text>
      </TouchableHighlight>
    </View>
  );
}
