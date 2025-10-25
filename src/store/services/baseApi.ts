import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import Router from 'next/router';

interface ErrorResponse {
  status: number;
  data: {
    message?: string;
    [key: string]: any;
  };
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.data) {
    console.log('✅ API Response:', result.data);
    // Example: localStorage.setItem('lastResponse', JSON.stringify(result.data));
  }

  if (result?.error) {
    const error = result.error as ErrorResponse;
    const status = error.status;
    const message = error.data?.Message || 'Something went wrong';

    switch (status) {
      case 400:
        console.error(`Bad Request: ${message}`);
        break;
      case 401:
        console.error('Unauthorized. Please login again.');
        localStorage.removeItem('token');
        Router.push('/login');
        break;
      case 403:
        console.error('Forbidden: You do not have access.');
        break;
      case 404:
        console.error(`Not Found: ${message}`);
        break;
      case 500:
        console.error('Server Error. Please try again later.');
        break;
      default:
        console.error(message);
        break;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
