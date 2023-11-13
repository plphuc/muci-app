import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/',
    }),
    registerUser: builder.mutation({
      query: (registerData) => ({
        url: '/auth/register',
        method: 'POST',
        body: registerData,
      }),
    }),
  }),
});

export default apiSlice;
export const { useGetUserQuery, useRegisterUserMutation } = apiSlice;
