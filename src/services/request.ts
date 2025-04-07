import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';

const API_HOST = 'http://192.168.1.40/api/identity';

export type IListArguments<T> = (
  page: number,
  pageSize: number,
  queryParams: string[],
) => Promise<Result<T>>;

export type Result<T> = {
  page: number;
  perPage: number;
  pageRows: number;
  filteredRows: number;
  totalRows: number;
  value: T;
  isSuccess: boolean;
  message: string;
  errors: string[];
  validationErrors: string[];
};

export const getTokenFromLocalStorage = () => localStorage.getItem('token');

export const setTokenToLocalStorage = (token: string) => localStorage.setItem('token', token);

export const baseErrorHandler = (error: ResponseError | any) => {
  const errorStatusCode: number = error.response?.status;
  throw error;
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
