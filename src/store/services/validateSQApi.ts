// services/forgotPasswordApi.ts
import { baseApi } from './baseApi';

interface ForgotPasswordSQRequest {
  Question1Id: string;
  Question1Text: string;
  Answer1: string;
  Question2Id: string;
  Question2Text: string;
  Answer2: string;
  UserName: string;
}

type ForgotPasswordSQResponse = string; // "Security Answers validation is successful."

export const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    validateSecurityAnswers: builder.mutation<
      ForgotPasswordSQResponse,
      ForgotPasswordSQRequest
    >({
      query: (body) => ({
        url: '/forgotPasswordSQ',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useValidateSecurityAnswersMutation } = forgotPasswordApi;
