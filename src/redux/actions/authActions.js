import {axiosInstance} from '../../helpers/http';
import qs from 'query-string';
import { AUTH_LOGOUT } from '../types/auth';
import { CLEAR_PROFILE } from '../types';

export const onLogin = (username, password) => {
  return async dispatch => {
    try {
      dispatch({type: 'CLEAR_ERROR'});
      dispatch({type: 'SET_LOADING', payload: true});

      const dataToSend = qs.stringify({
        username,
        password,
      });

      const {data} = await axiosInstance().post('/auth/login', dataToSend);

      if (data.success) {
        dispatch({type: 'LOGIN', payload: data.results});
      } else {
        dispatch({type: 'SET_ERROR', payload: data.message});
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        dispatch({type: 'SET_ERROR', payload: err.response.data.message});
      } else {
        dispatch({type: 'SET_ERROR', payload: 'Something went wrong'});
      }
    }
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch({type: AUTH_LOGOUT});
    dispatch({type: CLEAR_PROFILE});
  };
};
