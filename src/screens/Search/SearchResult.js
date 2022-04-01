import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import {Container, Box, Input, Center} from 'native-base';
import {globalStyle} from '../../helpers/globalStyle';
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default function SearchResult({navigation}) {
  const [search, setSearch] = useState('');

  const searchChange = e => {
    setSearch(e);
  };

  const removeHandler = () => {
    setSearch('');
  };

  const styles = StyleSheet.create({
    searchIcon: {
      marginLeft: 16,
      fontSize: 20,
    },
    removeIcon: {
      marginRight: 16,
      fontSize: 16,
    },
  });
  return (
    <SafeAreaView>
      <Box w="100%" py={7} style={[globalStyle.container]}>
        <Input
          w="100%"
          value={search}
          onChangeText={searchChange}
          placeholder="Search vehicle"
          InputLeftElement={<FAIcon name="search" style={styles.searchIcon} />}
          InputRightElement={
            search ? (
              <FAIcon
                onPress={removeHandler}
                name="remove"
                style={styles.removeIcon}
              />
            ) : null
          }
        />
      </Box>
    </SafeAreaView>
  );
}
