import {View, Text} from 'react-native';
import React from 'react';

export default function History({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions();
  }, [navigation]);
  return (
    <View>
      <Text>History</Text>
    </View>
  );
}
