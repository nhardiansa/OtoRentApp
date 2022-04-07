import {PROCESS_ERROR} from '../types';

export const clearProcessError = () => {
  return dispatch => {
    dispatch({
      type: PROCESS_ERROR,
      payload: '',
    });
  };
};
