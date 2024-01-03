import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { resetToken, saveAccessToken } from './tokenSlice';
import { logoutUser } from './userSlice';
import { Mutex } from 'async-mutex';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/' });
const mutex = new Mutex();

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    if (result.error.status === 401) {
      let newAccessToken;
      // prevent multiple calls to '/refreshToken' when multiple calls fail with 401
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          // if refresh token is not available, logout the user (no need to check in component)
          if (!refreshToken) {
            api.dispatch(resetToken());
            api.dispatch(logoutUser());
          }

          // get new access token
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
            newAccessToken = refreshResult.data.accessToken;

            // re-request the failed request with the new token
            const newResult = await baseQuery(
              {
                ...args,
                headers: { authorization: `Bearer ${newAccessToken}` },
              },
              api,
              extraOptions
            );
            return newResult;
          }
        } catch {
          api.dispatch(resetToken());
          api.dispatch(logoutUser());
        } finally {
          release();
        }
      } else {
        // await until the mutex is available, it means new access token is available
        await mutex.waitForUnlock();
        try {
          const newResult = await baseQuery(
            { ...args, headers: { authorization: `Bearer ${newAccessToken}` } },
            api,
            extraOptions
          );
          return newResult;
        } catch {
          api.dispatch(resetToken());
          api.dispatch(logoutUser());
        }
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
