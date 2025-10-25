// src/services/api/authApi.ts
import { baseApi } from './baseApi';

interface LoginRequest {
  UserName: string;
  Password: string;
  IsSecurityQuestionNeeded: boolean;
}

interface LoginResponse {
  UserId: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  CID: string;
  LastLoginDate: string; // or Date if parsed
  Token: string; // JWT token
  Expiration: string; // ISO date string
  NavigateToSecPage: boolean;
  Account: {
    FirstName: string;
    MiddleName: string;
    LastName: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
