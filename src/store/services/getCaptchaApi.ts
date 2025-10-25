// services/captchaApi.ts
import { baseApi } from './baseApi';

export const captchaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCaptchaImage: builder.query<Blob, void>({
      query: () => ({
        url: 'captcha', // Replace with your actual endpoint
        method: 'GET',
        responseHandler: (response) => response.blob(), // Important for binary
      }),
    }),
  }),
});

export const { useGetCaptchaImageQuery, useLazyGetCaptchaImageQuery } =
  captchaApi;
