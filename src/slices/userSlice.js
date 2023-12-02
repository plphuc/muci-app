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
    getDummy: builder.query({
      query: () => '/',
    }),

    getUser: builder.query({
      query: ({token}) => ({
        url: '/user/getUser',
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.stringify({token})}`}
      })
    }),

    getData: builder.query({
      query: ({ token }) => {
        return {
          url: '/pages/data',
          method: 'GET',
          headers: { Authorization: `Bearer ${JSON.stringify({ token })}` },
        };
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
  }),
});

export const getUserInfo = (state) => state.user;

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetDataQuery,
  useGetUserQuery,
  useGetDummyQuery,
} = extendedApiSlice;

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
