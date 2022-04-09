import qs from 'query-string';

import {axiosInstance} from '../../helpers/http';
import {
  SET_TEMP_AUTH_DATA,
  SET_TEMP_AUTH_ERROR,
  SET_TEMP_AUTH_LOADING,
  SET_TEMP_AUTH_SUCCESS,
  SET_TEMP_IS_VERIFYING,
} from '../types/tempAuth';

export const setTempAuthData = data => {
  return dispatch => {
    dispatch({
      type: SET_TEMP_AUTH_ERROR,
      payload: '',
    });

    dispatch({
      type: SET_TEMP_AUTH_SUCCESS,
      payload: '',
    });

    dispatch({
      type: SET_TEMP_AUTH_DATA,
      payload: data,
    });
  };
};

export const doRegister = data => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TEMP_AUTH_ERROR,
        payload: '',
      });

      dispatch({
        type: SET_TEMP_AUTH_SUCCESS,
        payload: '',
      });

      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: true,
      });

      const params = qs.stringify(data);

      const {data: response} = await axiosInstance().post(
        '/auth/register',
        params,
      );

      dispatch({
        type: SET_TEMP_AUTH_SUCCESS,
        payload: response.message,
      });

      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: false,
      });

      dispatch({
        type: SET_TEMP_IS_VERIFYING,
        payload: true,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
        dispatch({
          type: SET_TEMP_AUTH_ERROR,
          payload: err.response.data.message,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_TEMP_AUTH_ERROR,
          payload: err.message,
        });
      }
      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: false,
      });
    }
  };
};

export const setIsVerifying = state => {
  return dispatch => {
    dispatch({
      type: SET_TEMP_IS_VERIFYING,
      payload: state,
    });
  };
};

export const clearTempStatus = () => {
  return dispatch => {
    dispatch({
      type: SET_TEMP_AUTH_SUCCESS,
      payload: '',
    });

    dispatch({
      type: SET_TEMP_AUTH_ERROR,
      payload: '',
    });
  };
};

export const resendCodeVerification = data => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TEMP_AUTH_ERROR,
        payload: '',
      });

      dispatch({
        type: SET_TEMP_AUTH_SUCCESS,
        payload: '',
      });

      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: true,
      });

      const params = qs.stringify(data);

      const {data: response} = await axiosInstance().post(
        '/auth/confirm-reset',
        params,
      );

      dispatch({
        type: SET_TEMP_AUTH_SUCCESS,
        payload: response.message,
      });

      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_TEMP_AUTH_ERROR,
          payload: err.response.data.message,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_TEMP_AUTH_ERROR,
          payload: err.message,
        });
      }
      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: false,
      });
    }
  };
};
export const sendVerifyData = data => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TEMP_AUTH_ERROR,
        payload: '',
      });

      dispatch({
        type: SET_TEMP_AUTH_SUCCESS,
        payload: '',
      });

      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: true,
      });

      const params = qs.stringify(data);

      const {data: response} = await axiosInstance().post(
        '/auth/confirm-reset',
        params,
      );

      dispatch({
        type: SET_TEMP_AUTH_SUCCESS,
        payload: response.message,
      });

      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: false,
      });

      dispatch({
        type: SET_TEMP_IS_VERIFYING,
        payload: false,
      });

      dispatch({
        type: SET_TEMP_AUTH_DATA,
        payload: {},
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_TEMP_AUTH_ERROR,
          payload: err.response.data.message,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_TEMP_AUTH_ERROR,
          payload: err.message,
        });
      }
      dispatch({
        type: SET_TEMP_AUTH_LOADING,
        payload: false,
      });
    }
  };
};
