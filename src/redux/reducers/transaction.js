import {
  SET_DATA_TO_SEND,
  CLEAR_DATA_TO_SEND,
  SET_TRANSACTION_DETAIL,
  SET_TRANSACTION_LOADING,
  SET_TRANSACTION_ERROR,
  SET_TRANSACTION_QUERY_PARAMS,
} from '../types/transaction';

const initialState = {
  dataToSend: null,
  details: null,
  loading: false,
  error: '',

  queryParams: {},
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
      state.loading = false;
      return {...state};
    }

    case SET_TRANSACTION_QUERY_PARAMS: {
      state.queryParams = action.payload;
      return {...state};
    }

    default: {
      return state;
    }
  }
};

export default transactionReducer;
