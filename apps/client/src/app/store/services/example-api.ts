import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tTag = 'T';

export const exampleApi = createApi({
  tagTypes: [tTag],
  reducerPath: 'exampleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getExamplePosts: builder.query<any, void>({
      query: () => 'posts',
    }),
  }),
});

export const { useGetExamplePostsQuery } = exampleApi;
