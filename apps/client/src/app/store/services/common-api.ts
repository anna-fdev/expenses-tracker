import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiAuthParams, ApiSignUpResponse } from '@expenses-tracker/api-models';

import { setAuthToken } from '../slices';
import { AppState } from '../store';

export const CommonApiTag = 'CommonApiTag';
export const AuthTag = 'Auth';

export const commonApi = createApi({
  tagTypes: [CommonApiTag, AuthTag],
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SERVER_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state: AppState = getState() as AppState;

      const { authToken } = state.system;

      if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiSignUpResponse, ApiAuthParams>({
      query: (params) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: params,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const {
            data: { token },
          } = await queryFulfilled;

          // this is not a secure way to handle `authToken` storing, but this is not the purpose of this Demo
          localStorage.setItem('authToken', token);

          dispatch(setAuthToken(token));
        } catch (error) {
          // do nothing
        }
      },
    }),
    getExpenses: builder.query<any, void>({
      query: () => '/expenses',
    }),
  }),
});

export const { useSignUpMutation, useGetExpensesQuery } = commonApi;
