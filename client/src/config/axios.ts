import axios from 'axios';

const configureAxios = () => {
  // request interceptors
  axios.interceptors.request.use((config) => {});

  // response interceptors
  axios.interceptors.response.use((config) => {});
};

export { configureAxios };
