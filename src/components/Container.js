import {View, StyleSheet} from 'react-native';
import React from 'react';

export default function Container({children, style}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 26,
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
}
