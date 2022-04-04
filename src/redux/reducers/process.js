import {PROCESS_ERROR, PROCESS_LOADING} from '../types/process';

const initialState = {
  loading: false,
  error: '',
};

const processReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_LOADING: {
      state.loading = action.payload;
      return {
        ...state,
      };
    }

    case PROCESS_ERROR: {
      state.error = action.payload;
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default processReducer;
