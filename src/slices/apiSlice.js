import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/' })

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')
    // try to get a new token
    const refreshResult = await baseQuery('/auth/refreshToken', api, extraOptions)

    if (refreshResult.data) {
      // store the new token
      // api.dispatch(tokenReceived(refreshResult.data))
      console.log('receive new token', refreshResult.data);
      // api.dispatch(saveToken(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshToken) {
        localStorage.removeItem('refreshToken');
      }
    }
  }
  return result
}

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({})
});

export default apiSlice;
