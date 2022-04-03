import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import vehiclesReducer from './vehicles';
import authReducer from './auth';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

export default combineReducers({
  vehiclesReducer,
  authReducer: persistReducer(persistConfig, authReducer),
});
