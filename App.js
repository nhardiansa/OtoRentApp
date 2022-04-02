import React from 'react';

import {NativeBaseProvider} from 'native-base';
import Routes from './src/routes';
import {theme} from './src/helpers/customComponents';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Routes />
      </NativeBaseProvider>
    </Provider>
  );
}
