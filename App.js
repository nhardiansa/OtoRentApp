import React, {useEffect} from 'react';

import {NativeBaseProvider} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import Routes from './src/routes';
import {theme} from './src/helpers/customComponents';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './src/redux/store';
import RNBootSplash from 'react-native-bootsplash';

const {store, persistor} = reduxStore();

export default function App() {
  useEffect(() => {
    getToken();
    RNBootSplash.hide();
  }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
  };

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
