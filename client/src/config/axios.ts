import { Axios as AxiosInstance } from 'axios';

const Axios = new AxiosInstance({});

Axios.interceptors.request.use((config) => {});

Axios.interceptors.response.use((config) => {});

export { Axios };
