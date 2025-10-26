// store/services/verifySecurityQuestionApi.ts
import { baseApi } from './baseApi';

interface VerifySecurityQuestionPayload {
  UserId: string;
  QuestionID: number;
  Answer: string;
  RememberDevice: boolean | undefined;
  RememberUserID: boolean;
}

interface VerifySecurityQuestionResponse {
  success: boolean;
  message?: string;
  token?: string; // if applicable
}

export const verifySecurityQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifySecurityQuestion: builder.mutation<
      VerifySecurityQuestionResponse,
      VerifySecurityQuestionPayload
    >({
      query: (body) => ({
        url: '/verify-security-questions',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useVerifySecurityQuestionMutation } = verifySecurityQuestionApi;
