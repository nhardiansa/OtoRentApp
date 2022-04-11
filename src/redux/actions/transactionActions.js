import qs from 'query-string';
import {axiosInstance} from '../../helpers/http';
import {
  CLEAR_DATA_TO_SEND,
  SET_DATA_TO_SEND,
  SET_TRANSACTION_DETAIL,
  SET_TRANSACTION_ERROR,
  SET_TRANSACTION_LOADING,
} from '../types/transaction';
import {SET_VEHICLE} from '../types/vehicles';

export const setDataToSend = data => {
  return dispatch => {
    dispatch({
      type: SET_DATA_TO_SEND,
      payload: data,
    });
  };
};

export const clearDataToSend = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_DATA_TO_SEND,
    });
  };
};

export const createTransaction = (transactionData, token) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: true,
      });

      const params = qs.stringify(transactionData);
      const {data} = await axiosInstance(token).post('/histories', params);

      dispatch({
        type: SET_TRANSACTION_DETAIL,
        payload: data.results,
      });

      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.response.data.error,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const payTransaction = (transactionId, token) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: true,
      });

      const params = qs.stringify({
        payment: true,
      });

      const {data} = await axiosInstance(token).patch(
        `/histories/${transactionId}`,
        params,
      );

      dispatch({
        type: SET_TRANSACTION_DETAIL,
        payload: data.results,
      });

      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.response.data.error,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
export const vehicleIsReturned = (transactionId, token) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: true,
      });

      const params = qs.stringify({
        returned: true,
      });

      const {data} = await axiosInstance(token).patch(
        `/histories/${transactionId}`,
        params,
      );

      dispatch({
        type: SET_TRANSACTION_DETAIL,
        payload: data.results,
      });

      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.response.data.error,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
export const getTransactionDetail = (transactionId, token) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: true,
      });

      const trxDetail = await axiosInstance(token).get(
        `/histories/${transactionId}`,
      );

      const vehicleId = trxDetail.data.results.vehicle_id;

      const vehicleDetails = await axiosInstance().get(
        `/vehicles/${vehicleId}`,
      );

      dispatch({
        type: SET_VEHICLE,
        payload: vehicleDetails.data.results,
      });

      dispatch({
        type: SET_TRANSACTION_DETAIL,
        payload: trxDetail.data.results,
      });

      dispatch({
        type: SET_TRANSACTION_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.response.data.error,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_TRANSACTION_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const clearTransactionDetail = () => {
  return dispatch => {
    dispatch({
      type: SET_TRANSACTION_DETAIL,
      payload: null,
    });
  };
};

export const clearTransactionError = () => {
  return dispatch => {
    dispatch({
      type: SET_TRANSACTION_ERROR,
      payload: '',
    });
  };
};
