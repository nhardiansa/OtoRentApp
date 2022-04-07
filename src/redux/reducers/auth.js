import { AUTH_LOGOUT } from "../types/auth";

const initialState = {
  user: null,
  isLoading: false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: '',
      };
    }

    case AUTH_LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
