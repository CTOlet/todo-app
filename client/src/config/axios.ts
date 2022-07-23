import axios from 'axios';

const configureAxios = () => {
  // request interceptors
  axios.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
  });
  // response interceptors
  axios.interceptors.response.use((config) => {
    return config;
  });
};

export { configureAxios };
