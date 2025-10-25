// services/userApi.ts
import { baseApi } from './baseApi';

interface VerifyOtpPayload {
  UserId: string;
  EnteredOtp: string;
  Otp: string; // assuming only these two options
}

interface VerifyOtpResponse {
  // define based on actual response structure
  Otp: string;
  message?: string;
}

export const verifyOtpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: (credentials) => ({
        url: '/verify-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useVerifyOtpMutation } = verifyOtpApi;
