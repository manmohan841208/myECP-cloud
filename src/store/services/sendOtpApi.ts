// services/userApi.ts
import { baseApi } from './baseApi';

interface SendOtpPayload {
  UserId: string;
  OtpOption: 'Email' | 'SMS' | ''; // assuming only these two options
}

interface SendOtpResponse {
  // define based on actual response structure
  Otp: string;
  message?: string;
}

export const sendOtpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResponse, SendOtpPayload>({
      query: (credentials) => ({
        url: '/send-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSendOtpMutation } = sendOtpApi;
