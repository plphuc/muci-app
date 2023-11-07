import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/',
    })
  })
});

export default apiSlice;
export const { useGetUserQuery } = apiSlice;
