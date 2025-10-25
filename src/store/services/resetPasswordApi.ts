// services/resetPasswordApi.ts
import { baseApi } from './baseApi';

interface ResetPasswordRequest {
  UserName: string;
  NewPassword: string;
  ConfirmPassword: string;
}

type ResetPasswordResponse = string; // "Reset Password Process is complete."

export const resetPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: '/resetPassword',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordApi;
