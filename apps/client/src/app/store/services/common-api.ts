import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  ApiAuthParams,
  ApiEntryList,
  ApiExpense,
  ApiExpenseParams,
  ApiSignInResponse,
  ApiSignUpResponse,
  ApiUser,
} from '@expenses-tracker/api-models';

import { resetAuthToken, setAuthToken } from '../slices';
import { AppState } from '../store';
import { AUTH_TOKEN } from '../../constants';

export const CommonApiTag = 'CommonApiTag';
export const AuthTag = 'Auth';
export const ExpenseTag = 'Expense';

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
  tagTypes: [CommonApiTag, AuthTag, ExpenseTag],
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

          // this is not a secure way to handle `AUTH_TOKEN` storing, but this is not the purpose of this Demo
          localStorage.setItem(AUTH_TOKEN, token);

          dispatch(setAuthToken(token));
        } catch (error) {
          console.error(error);
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

          // this is not a secure way to handle `AUTH_TOKEN` storing, but this is not the purpose of this Demo
          localStorage.setItem(AUTH_TOKEN, token);

          dispatch(setAuthToken(token));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getUserMeData: builder.query<ApiUser, void>({
      query: () => '/user/me',
    }),
    getExpenses: builder.query<ApiEntryList<ApiExpense>, void>({
      query: () => '/expenses',
      providesTags: [ExpenseTag],
    }),
    getExpense: builder.query<ApiExpense, string>({
      query: (id) => `/expenses/${id}`,
      providesTags: [ExpenseTag],
    }),
    createExpense: builder.mutation<ApiExpense, ApiExpenseParams>({
      query: (params) => ({
        url: '/expenses',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: [ExpenseTag],
    }),
    updateExpense: builder.mutation<ApiExpense, ApiExpense>({
      query: ({ id, ...rest }) => ({
        url: `/expenses/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [ExpenseTag],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,

  useGetUserMeDataQuery,

  useGetExpensesQuery,
  useGetExpenseQuery,

  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} = commonApi;
