import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchResult from '../screens/Search/SearchResult';
import Filter from '../screens/Search/Filter';
import {FILTER_SCREEN, SEARCH_SCREEN} from '../helpers/destinationConstants';

const Search = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Search.Navigator>
      <Search.Screen name={SEARCH_SCREEN} component={SearchResult} />
      <Search.Screen name={FILTER_SCREEN} component={Filter} />
    </Search.Navigator>
  );
}
