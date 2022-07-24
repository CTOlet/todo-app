import axios, { AxiosResponse } from 'axios';
import { IO } from 'moneo-ts';
import urlcat from 'urlcat';
import { store } from '../../services';
import { ErrorResponse, SuccessResponse, User } from '../../types';

const signUp = IO.async(async (user: Pick<User, 'username' | 'password'>) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signup');
  return axios.post<
    never,
    AxiosResponse<SuccessResponse, ErrorResponse>,
    Pick<User, 'username' | 'password'>
  >(url, user);
});

const signIn = IO.async(async (user: Pick<User, 'username' | 'password'>) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signin');
  return axios.post<
    never,
    AxiosResponse<SuccessResponse<{ accessToken: string }>, ErrorResponse>,
    Pick<User, 'username' | 'password'>
  >(url, user);
}).forEach((response) => {
  store.update((state) => {
    state.accessToken = response.data.data?.accessToken;
  });
});

const refresh = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/refresh');
  return axios.post<
    never,
    AxiosResponse<SuccessResponse<{ accessToken: string }>, ErrorResponse>
  >(url);
}).forEach((response) => {
  store.update((state) => {
    state.accessToken = response.data.data?.accessToken;
  });
});

const signOut = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signout');
  return axios.post<never, AxiosResponse<SuccessResponse, ErrorResponse>>(url);
});

export { signUp, signIn, refresh, signOut };
