import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiAuthParams } from '@expenses-tracker/api-models';

export const AuthTag = 'Auth';

export const authApi = createApi({
  tagTypes: [AuthTag],
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SERVER_API_URL,
  }),
  endpoints: (builder) => ({
    // TODO provide response type
    signUp: builder.mutation<any, ApiAuthParams>({
      query: (params) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
