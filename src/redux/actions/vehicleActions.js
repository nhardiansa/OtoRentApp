import {
  SET_BIKES,
  SET_CARS,
  SET_ERROR,
  SET_LOADING,
  SET_MOTORCYCLES,
} from '../types/vehicles';
import {axiosInstance} from '../../helpers/http';

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

      const motorcyles = await axiosInstance().get(
        '/vehicles/filter?category_id=3',
      );
      const cars = await axiosInstance().get('/vehicles/filter?category_id=2');
      const bikes = await axiosInstance().get('/vehicles/filter?category_id=4');

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
        type: 'SET_DETAIL',
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
