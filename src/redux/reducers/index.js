import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import vehiclesReducer from './vehicles';
import authReducer from './auth';
import processReducer from './process';
import transactionReducer from './transaction';
import userReducer from './user';
import tempAuthReducer from './tempAuth';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

export default combineReducers({
  vehiclesReducer,
  processReducer,
  transactionReducer,
  userReducer,
  authReducer: persistReducer(persistConfig, authReducer),
  tempAuthReducer,
});
