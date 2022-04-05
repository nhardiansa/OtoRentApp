import {
  SET_DATA_TO_SEND,
  CLEAR_DATA_TO_SEND,
  SET_TRANSACTION_DETAIL,
  SET_TRANSACTION_LOADING,
  SET_TRANSACTION_ERROR,
} from '../types/transaction';

const initialState = {
  dataToSend: null,
  details: null,
  loading: false,
  error: '',
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_TO_SEND: {
      const data = action.payload;
      state.dataToSend = data;
      return {...state};
    }

    case CLEAR_DATA_TO_SEND: {
      state.dataToSend = null;
      return {...state};
    }

    case SET_TRANSACTION_DETAIL: {
      state.details = action.payload;
      return {...state};
    }

    case SET_TRANSACTION_LOADING: {
      state.loading = action.payload;
      return {...state};
    }

    case SET_TRANSACTION_ERROR: {
      state.error = action.payload;
      return {...state};
    }

    default: {
      return state;
    }
  }
};

export default transactionReducer;
