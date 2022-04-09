import {
  SET_BIKES,
  SET_CARS,
  SET_ERROR,
  SET_LOADING,
  SET_MOTORCYCLES,
  SET_VEHICLE,
  SET_VEHICLES,
  SET_QUERY,
  SET_LOADING_MORE,
  CLEAR_VEHICLES,
  SET_DATA_TO_FILTER,
} from '../types/vehicles';
import {axiosInstance} from '../../helpers/http';
import qs from 'query-string';

export const getVehiclesHome = () => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_ERROR,
        payload: '',
      });

      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const motorcylesParams = qs.stringify({
        category_id: 3,
        available: true,
        limit: 4,
      });
      const carsParams = qs.stringify({
        category_id: 2,
        available: true,
        limit: 4,
      });
      const bikesParams = qs.stringify({
        category_id: 4,
        available: true,
        limit: 4,
      });

      console.log(motorcylesParams);

      const motorcyles = await axiosInstance().get(
        '/vehicles/filter' + '?' + motorcylesParams,
      );
      const cars = await axiosInstance().get(
        '/vehicles/filter' + '?' + carsParams,
      );
      const bikes = await axiosInstance().get(
        '/vehicles/filter' + '?' + bikesParams,
      );

      dispatch({
        type: SET_MOTORCYCLES,
        payload: motorcyles.data.results,
      });

      dispatch({
        type: SET_CARS,
        payload: cars.data.results,
      });

      dispatch({
        type: SET_BIKES,
        payload: bikes.data.results,
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: SET_LOADING,
        payload: false,
      });

      if (err.response) {
        dispatch({
          type: SET_ERROR,
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const getVehicleDetail = id => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_ERROR,
        payload: '',
      });
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const {data} = await axiosInstance().get(`/vehicles/${id}`);

      dispatch({
        type: SET_VEHICLE,
        payload: data.results,
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    } catch (err) {
      console.error(err);
      if (err.response) {
        dispatch({
          type: SET_ERROR,
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const clearVehicleDetail = () => {
  return dispatch => {
    dispatch({
      type: SET_VEHICLE,
      payload: {},
    });
  };
};

export const setQuery = data => {
  return dispatch => {
    dispatch({
      type: SET_QUERY,
      payload: data,
    });
  };
};

export const setVehicleList = rawQuery => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_ERROR,
        payload: '',
      });
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      dispatch({
        type: CLEAR_VEHICLES,
      });

      let query = rawQuery;

      if (query.sorter) {
        const value = query.sorter;
        delete query.sorter;
        for (const key in value) {
          query[key] = value[key];
        }
      }
      console.log('query', query);

      for (const key in query) {
        if (query[key] === '') {
          delete query[key];
        }
      }

      const params = qs.stringify({
        ...query,
        limit: 8,
        available: 1,
      });

      const response = await axiosInstance().get(`/vehicles/filter?${params}`);

      dispatch({
        type: SET_VEHICLES,
        payload: response.data,
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_ERROR,
          payload: err.response.data.message,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const loadMoreVehicles = uri => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_ERROR,
        payload: '',
      });
      dispatch({
        type: SET_LOADING_MORE,
        payload: true,
      });

      const params = uri.split('?')[1];

      const {data} = await axiosInstance().get(`/vehicles/filter?${params}`);

      dispatch({
        type: SET_VEHICLES,
        payload: data,
      });

      dispatch({
        type: SET_LOADING_MORE,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_ERROR,
          payload: err.response.data.message,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const setDataForSearch = () => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const categories = await axiosInstance().get('/categories');
      const locations = await axiosInstance().get('/vehicles/location');

      const data = {
        categories: categories.data.results,
        locations: locations.data.results,
      };

      dispatch({
        type: SET_DATA_TO_FILTER,
        payload: data,
      });

      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        dispatch({
          type: SET_ERROR,
          payload: err.response.data.message,
        });
      } else {
        console.error(err);
        dispatch({
          type: SET_ERROR,
          payload: err.message,
        });
      }
    }
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  };
};
