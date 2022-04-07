import {
  GET_VEHICLES,
  SET_BIKES,
  SET_CARS,
  SET_ERROR,
  SET_LOADING,
  SET_MOTORCYCLES,
  SET_QUERY,
  SET_VEHICLE,
  SET_VEHICLES,
  SET_LOADING_MORE,
  CLEAR_VEHICLES,
} from '../types/vehicles';

const initialState = {
  vehicles: [],
  vehicle: {},
  loading: false,
  loadMoreLoading: false,
  error: '',
  pageInfo: {},

  cars: [],
  motorcycles: [],
  bikes: [],

  query: {},
};

const vehiclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLES: {
      state.vehicles = action.payload;
      return {
        ...state,
      };
    }

    case SET_LOADING: {
      state.loading = action.payload;
      return {
        ...state,
      };
    }

    case SET_ERROR: {
      state.error = action.payload;
      return {
        ...state,
      };
    }

    case SET_CARS: {
      state.cars = action.payload;
      return {
        ...state,
      };
    }

    case SET_MOTORCYCLES: {
      state.motorcycles = action.payload;
      return {
        ...state,
      };
    }

    case SET_BIKES: {
      state.bikes = action.payload;
      return {
        ...state,
      };
    }

    case SET_VEHICLE: {
      state.vehicle = action.payload;
      return {
        ...state,
      };
    }

    case SET_QUERY: {
      state.query = action.payload;
      return {
        ...state,
      };
    }

    case SET_VEHICLES: {
      const {results, pageInfo} = action.payload;
      state.vehicles = [...state.vehicles, ...results];
      state.pageInfo = pageInfo;
      return {
        ...state,
      };
    }

    case SET_LOADING_MORE: {
      state.loadMoreLoading = action.payload;
      return {
        ...state,
      };
    }

    case CLEAR_VEHICLES: {
      state.vehicles = [];
      state.pageInfo = {};
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default vehiclesReducer;
