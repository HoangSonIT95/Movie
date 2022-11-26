import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

const token = JSON.parse(localStorage.getItem('token'));
const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    authorization: token,
  },
});

axiosClient.interceptors.request.use(async config => config);

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    return null;
    throw error;
  }
);

export default axiosClient;
