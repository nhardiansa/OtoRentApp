import React from 'react';

import {NativeBaseProvider} from 'native-base';
import Routes from './src/routes';
import {theme} from './src/helpers/customComponents';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './src/redux/store';

const {store, persistor} = reduxStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <Routes />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
