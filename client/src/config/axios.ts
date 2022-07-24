import axios from 'axios';
import { store } from '../services';

const configureAxios = () => {
  // request interceptors
  axios.interceptors.request.use((config) => {
    const accessToken = store.getRawState().accessToken;
    config.withCredentials = true;
    config.headers = {
      ...config.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
    return config;
  });
  // response interceptors
  axios.interceptors.response.use((config) => {
    return config;
  });
};

export { configureAxios };
