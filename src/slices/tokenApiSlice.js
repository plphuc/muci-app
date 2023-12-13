import apiSlice from './apiSlice';


const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccessToken: builder.query({
      query: (refreshToken) => ({
        url: '/auth/generateAccessToken',
        method: 'GET',
        headers: { Authorization: `Bearer ${refreshToken}` },
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
  }),
});

export const { useGetAccessTokenQuery } = extendedApiSlice;
