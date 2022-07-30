import axios, { AxiosResponse } from 'axios';
import { IO } from 'moneo-ts';
import urlcat from 'urlcat';
import { ResponseError, ResponseSuccess, User } from '../types';

const signUp = IO.async(async (user: Pick<User, 'username' | 'password'>) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signup');
  return axios.post<
    never,
    AxiosResponse<ResponseSuccess, ResponseError>,
    typeof user
  >(url, user);
});

const signIn = IO.async(async (user?: Pick<User, 'username' | 'password'>) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signin');
  return axios.post<
    never,
    AxiosResponse<ResponseSuccess<{ accessToken: string }>, ResponseError>,
    typeof user
  >(url, user);
});

const refresh = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/refresh');
  return axios.post<
    never,
    AxiosResponse<ResponseSuccess<{ accessToken: string }>, ResponseError>
  >(url);
});

const signOut = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/users/signout');
  return axios.post<never, AxiosResponse<ResponseSuccess, ResponseError>>(url);
});

export { signUp, signIn, refresh, signOut };
