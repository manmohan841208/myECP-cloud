// services/forgotUserNameApi.ts
import { baseApi } from './baseApi';

interface ForgotUserNameRequest {
  LastName: string;
  SSNLast5: string;
  DOB_Day: string;
  DOB_Month: string;
  DOB_Year: string;
}

interface ForgotUserNameResponse {
  UserName: string;
}

export const forgotUserNameApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotUserName: builder.mutation<
      ForgotUserNameResponse,
      ForgotUserNameRequest
    >({
      query: (body) => ({
        url: '/forgotUserName',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useForgotUserNameMutation } = forgotUserNameApi;
