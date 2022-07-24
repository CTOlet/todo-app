import axios, { AxiosResponse } from 'axios';
import { IO } from 'moneo-ts';
import urlcat from 'urlcat';
import { ErrorResponse, SuccessResponse, User } from '../../types';

const signUp = IO.async(async (user: Pick<User, 'username' | 'password'>) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/signup');
  return axios.post<
    never,
    AxiosResponse<SuccessResponse, ErrorResponse>,
    Pick<User, 'username' | 'password'>
  >(url, user);
});

const signIn = IO.async(async (user: Pick<User, 'username' | 'password'>) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/signin');
  return axios.post<
    never,
    AxiosResponse<SuccessResponse, ErrorResponse>,
    Pick<User, 'username' | 'password'>
  >(url, user);
});

const refresh = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/refresh');
  return axios.post<never, AxiosResponse<SuccessResponse, ErrorResponse>>(url);
});

const signOut = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/signout');
  return axios.post<never, AxiosResponse<SuccessResponse, ErrorResponse>>(url);
});

export { signUp, signIn, refresh, signOut };
