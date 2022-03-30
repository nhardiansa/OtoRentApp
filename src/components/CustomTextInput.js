import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {fontFamily, fontSize, fontStyle} from '../helpers/styleConstants';

export default function CustomTextInput({style, ...rest}) {
  return (
    <TextInput
      style={[styles.input, style]}
      {...rest}
      placeholderTextColor="white"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 51,
    padding: 16,
    backgroundColor: 'rgba(223, 222, 222, 0.3)',
    fontSize: fontSize.md,
    borderRadius: 10,
    color: 'white',
    fontFamily: fontStyle(fontFamily.primary, 'bold'),
  },
});
