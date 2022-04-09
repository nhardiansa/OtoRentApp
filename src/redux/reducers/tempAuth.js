import {
  SET_TEMP_AUTH_DATA,
  SET_TEMP_AUTH_ERROR,
  SET_TEMP_AUTH_LOADING,
  SET_TEMP_AUTH_SUCCESS,
  SET_TEMP_IS_VERIFYING,
} from '../types/tempAuth';

const initialState = {
  data: {},
  loading: false,
  error: '',
  success: '',
  isVerifying: false,
};

const tempAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMP_AUTH_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case SET_TEMP_AUTH_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_TEMP_AUTH_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case SET_TEMP_IS_VERIFYING: {
      return {
        ...state,
        isVerifying: action.payload,
      };
    }

    case SET_TEMP_AUTH_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default tempAuthReducer;
