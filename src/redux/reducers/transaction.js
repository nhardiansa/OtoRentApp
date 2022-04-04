const initialState = {
  dataToSend: null,
  details: null,
  loading: false,
  error: '',
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRANSACTION': {
      const data = action.payload;
      state.dataToSend = data;
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default transactionReducer;
