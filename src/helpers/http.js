import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../helpers/constants';

export const axiosInstance = (useToken = false, useBaseURL = true) => {
  const headers = {};

  if (useToken) {
    const {token} = AsyncStorage.getItem('user');
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
