import apiSlice from './apiSlice';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        'refreshToken',
        JSON.stringify({
          refreshToken: action.payload.tokens.refresh,
        })
      );
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
      query: (refreshToken) => ({
        url: '/user/getUser',
        method: 'GET',
        headers: { Authorization: `Bearer ${refreshToken}` },
      }),
      transformResponse: (response, meta, arg) => {
        return { user: response };
      },
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response, meta, arg) => {
        const { _id: id, ...remainingInfo } = response.user;
        return {
          tokens: response.tokens,
          user: {
            id,
            ...remainingInfo,
          },
        };
      },
      providesTags: ['User'],
    }),

    registerUser: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response, meta, arg) => {
        const { _id: id, ...remainingInfo } = response.user;
        return {
          tokens: response.tokens,
          user: {
            id,
            ...remainingInfo,
          },
        };
      },
      invalidatesTags: ['User'],
    }),

    getData: builder.query({
      query: (accessToken) => ({
        url: '/pages/data',
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),
  }),
});

export const getUserInfo = (state) => state.user;

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetDataQuery,
  useGetUserQuery,
} = extendedApiSlice;

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
