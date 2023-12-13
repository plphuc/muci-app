import apiSlice from './apiSlice';
const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      return initialState;
    },
  },
});

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => {
        return ({
        url: '/user/getUser',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })},
      transformResponse: (response, meta, arg) => {
        return response
      }
    }),

    getData: builder.query({
      query: (token) => {
        return {
          url: '/pages/data',
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
    }),

    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response, meta, arg) => {
        return {
          tokens: response.tokens,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetDataQuery,
  useGetUserQuery,
} = extendedApiSlice;

export const getUserInfo = (state) => state.user;

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
