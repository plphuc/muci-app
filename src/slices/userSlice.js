import apiSlice from './apiSlice';
const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      return action.payload;
    },
    logoutUser: (state, action) => {
      return initialState;
    },
  },
});

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => {
        return {
          url: '/user/getUser',
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      transformResponse: (response, meta, arg) => {
        return response;
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
    }),
  }),
});

export const selectUserInfo = (state) => state.user;
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = extendedApiSlice;

export const { logoutUser, saveUserInfo } = userSlice.actions;
export default userSlice.reducer;
