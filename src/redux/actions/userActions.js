import {axiosInstance, blobFetch} from '../../helpers/http';
import {PROCESS_ERROR, PROCESS_LOADING, SET_PROFILE} from '../types';

export const setUserProfile = token => {
  return async dispatch => {
    try {
      dispatch({
        type: PROCESS_LOADING,
        payload: true,
      });

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

export const updateUserProfile = (dataCollection, token) => {
  return async dispatch => {
    try {
      dispatch({
        type: PROCESS_ERROR,
        payload: '',
      });

      dispatch({
        type: PROCESS_LOADING,
        payload: true,
      });

      const {userId, dataToSend} = dataCollection;

      const {data} = await blobFetch(
        'PATCH',
        `users/${userId}`,
        dataToSend,
        token,
      );

      const {results} = await JSON.parse(data);

      dispatch({
        type: SET_PROFILE,
        payload: results,
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
      dispatch({
        type: PROCESS_LOADING,
        payload: false,
      });
    }
  };
};
