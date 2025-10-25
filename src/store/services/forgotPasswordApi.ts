// src/services/api/authApi.ts
import { baseApi } from './baseApi';

interface ForgotPasswordRequest {
  UserName: string;
  SSNLast5: string;
  DOB_Day: string;
  DOB_Month: string;
  DOB_Year: string;
}

interface ForgotPasswordResponse {
  uestion1Id: number;
  Question1Text: string;
  Question2Id: number;
  Question2Text: string;
}

export const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (credentials) => ({
        url: '/forgotPassword',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
