import axios from 'axios';
import { MutationKey } from '../constants';
import { store } from '../services';
import { queryClient } from './react-query';

const configureAxios = () => {
  // request interceptors
  axios.interceptors.request.use((config) => {
    const cache = queryClient.getMutationCache();
    const signInCache = cache.find<{ accessToken?: string }>({
      mutationKey: MutationKey.SIGN_IN,
    });
    const accessToken = signInCache?.state.data?.accessToken;

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
