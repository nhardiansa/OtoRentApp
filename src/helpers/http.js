import axios from 'axios';
import {baseURL} from '../helpers/constants';
import RNFetchBlob from 'rn-fetch-blob';

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

export const blobFetch = (method, path, data, token) => {
  const headers = {};
  const uri = baseURL + '/' + path;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers['Content-Type'] = 'multipart/form-data';
  }

  return RNFetchBlob.fetch(method, uri, headers, data);
};
