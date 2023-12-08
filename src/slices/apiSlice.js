import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/' });

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.log('error', result.error);
    if (result.error.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      // try to get a new token
      const refreshResult = await baseQuery(args, {
        url: 'auth/genereateAccessToken',
        method: 'GET',
        headers: `Bearer ${refreshToken}` 
      }, extraOptions)

      if (refreshResult.data) {
        // store the new token
        // api.dispatch(tokenReceived(refreshResult.data))
        console.log('receive new token', refreshResult.data);
        // retry the initial query
        const newResult = await baseQuery(args, api, extraOptions);
        return { ...newResult, accessToken: refreshResult.data };
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
