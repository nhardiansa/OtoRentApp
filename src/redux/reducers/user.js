import {CLEAR_PROFILE, SET_PROFILE} from '../types';

const initialState = {
  profile: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }

    case CLEAR_PROFILE: {
      return {
        ...state,
        profile: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
