import React from 'react';

import {NativeBaseProvider} from 'native-base';
import Routes from './src/routes';
import {theme} from './src/helpers/customComponents';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Routes />
    </NativeBaseProvider>
  );
}
