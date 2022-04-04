import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers/http';
import {PROCESS_ERROR, PROCESS_LOADING, SET_PROFILE} from '../types';

export const setUserProfile = () => {
  return async dispatch => {
    try {
      dispatch({
        type: PROCESS_LOADING,
        payload: true,
      });

      const token = await AsyncStorage.getItem('token');
      const {data} = await axiosInstance(token).get('/users/profile');

      dispatch({
        type: SET_PROFILE,
        payload: data.results,
      });

      dispatch({
        type: PROCESS_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: PROCESS_ERROR,
          payload: err.response.data.message,
        });
      } else {
        console.error(err);
        dispatch({
          type: PROCESS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
