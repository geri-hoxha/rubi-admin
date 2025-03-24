import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';

const API_HOST = 'http://192.168.1.40/api/identity';

export const getTokenFromLocalStorage = () => localStorage.getItem('token');

export const baseErrorHandler = (error: ResponseError | any) => {
  const errorStatusCode: number = error.response?.status;
  console.log(error.data);
};

const request = extend({
  prefix: API_HOST,
  errorHandler: baseErrorHandler,
});

request.interceptors.request.use(
  (url, options) => {
    const headers = { Authorization: `Bearer ${getTokenFromLocalStorage()}` };
    return { url, options: { ...options, headers } };
  },
  { global: false },
);

export default request;

// request.interceptors.response.use(async (response, options) => {}, { global: false });
  