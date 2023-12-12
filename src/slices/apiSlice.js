import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { saveToken } from './tokenSlice';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/' });

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        // we can't refresh, throw the error so we can catch it
        throw result.error;
      }
      // try to get a new token
      const refreshResult = await baseQuery(args, {
        url: 'auth/generateAccessToken',
        method: 'GET',
        headers: `Bearer ${refreshToken}` 
      }, extraOptions)
      console.log("refreshResult", refreshResult);

      if (refreshResult.accessToken) {
        // store the new token
        const newResult = await baseQuery(args, api, extraOptions);
        api.dispatch(saveToken(refreshResult.accessToken))
        return { ...newResult };
      } else {
        // we can't refresh the token, so logout the user
        localStorage.removeItem('refreshToken');
      }
    }
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
