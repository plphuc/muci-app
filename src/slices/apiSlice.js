import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { resetToken, saveAccessToken } from './tokenSlice';
import { logoutUser } from './userSlice';

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
      const refreshResult = await baseQuery(
        {
          url: '/auth/generateAccessToken',
          method: 'GET',
          headers: { authorization: `Bearer ${refreshToken}` },
        },
        api,
        extraOptions
      );

      if (refreshResult.data.accessToken) {
        api.dispatch(saveAccessToken(refreshResult.data.accessToken));
        // re-request the failed request with the new token
        const newResult = await baseQuery(args, api, extraOptions);
        return { ...newResult };
      } else {
        // we can't refresh the token, so logout the user
        api.dispatch(resetToken())
        api.dispatch(logoutUser());
        throw result.error;
      }
    }
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Page', 'Cover'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
