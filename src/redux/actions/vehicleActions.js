import {SET_ERROR, SET_LOADING, SET_MOTORCYCLES} from '../types/vehicles';
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

      const {data} = await axiosInstance().get(
        '/vehicles/filter?category_id=3',
      );

      dispatch({
        type: SET_LOADING,
        payload: false,
      });

      dispatch({
        type: SET_MOTORCYCLES,
        payload: data.results,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};
