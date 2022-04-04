import axios from 'axios';
import {baseURL} from '../helpers/constants';

export const axiosInstance = (token, useBaseURL = true) => {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // if (useBaseURL) {
  //   return axios.create({
  //     headers
  //   });
  // }

  return axios.create({
    baseURL: useBaseURL ? baseURL : '',
    headers,
  });
};
