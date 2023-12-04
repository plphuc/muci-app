import apiSlice from './apiSlice';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      return action.payload;
    },
  },
});

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

export const selectAccessToken = (state) => state.tokens?.accessToken;
export const selectRefreshToken = (state) => state.tokens?.refreshToken;

export const { useGetAccessTokenQuery } = extendedApiSlice;

export const { saveToken } = tokenSlice.actions;
export default tokenSlice.reducer;