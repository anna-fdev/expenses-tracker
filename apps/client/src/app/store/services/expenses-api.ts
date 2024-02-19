import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ExpensesTag = 'Expenses';

export const expensesApi = createApi({
  tagTypes: [ExpensesTag],
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SERVER_API_URL,
  }),
  endpoints: (builder) => ({
    // TODO provide typing
    getExpenses: builder.query<any, void>({
      query: () => '/expenses',
    }),
  }),
});

export const { useGetExpensesQuery } = expensesApi;
