import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  ApiAuthParams,
  ApiSignInResponse,
  ApiSignUpResponse,
} from '@expenses-tracker/api-models';

import { resetAuthToken, setAuthToken } from '../slices';
import { AppState } from '../store';
import { authToken } from '../../constants';

export const CommonApiTag = 'CommonApiTag';
export const AuthTag = 'Auth';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state: AppState = getState() as AppState;

    const { authToken } = state.system;

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    return headers;
  },
});

const baseQueryWithErrorListener: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  const result = await baseQuery(args, api, extra);

  if (result?.error?.status === 401) {
    api.dispatch(resetAuthToken());
  }

  return result;
};

export const commonApi = createApi({
  tagTypes: [CommonApiTag, AuthTag],
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithErrorListener,
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
          localStorage.setItem(authToken, token);

          dispatch(setAuthToken(token));
        } catch (error) {
          // TODO handle the error here
        }
      },
    }),
    signIn: builder.mutation<ApiSignInResponse, ApiAuthParams>({
      query: (params) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: params,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const {
            data: { token },
          } = await queryFulfilled;

          // this is not a secure way to handle `authToken` storing, but this is not the purpose of this Demo
          localStorage.setItem(authToken, token);

          dispatch(setAuthToken(token));
        } catch (error) {
          // TODO handle the error here
        }
      },
    }),
    getExpenses: builder.query<any, void>({
      query: () => '/expenses',
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetExpensesQuery } =
  commonApi;
