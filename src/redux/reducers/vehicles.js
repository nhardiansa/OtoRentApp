import {
  GET_VEHICLES,
  SET_BIKES,
  SET_CARS,
  SET_ERROR,
  SET_LOADING,
  SET_MOTORCYCLES,
  SET_VEHICLE,
} from '../types/vehicles';

const initialState = {
  vehicles: [],
  vehicle: {},
  loading: false,
  error: '',
  pageInfo: {},

  cars: [],
  motorcycles: [],
  bikes: [],
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

    default: {
      return state;
    }
  }
};

export default vehiclesReducer;
