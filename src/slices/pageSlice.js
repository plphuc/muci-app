import apiSlice from './apiSlice';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    savePages: (state, action) => {
      return action.payload;
    },
    saveCurrentPage: (state, action) => {
      return action.payload;
    },
  },
});

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPages: builder.query({
      query: (accessToken) => {
        return {
          url: '/page/getAllPages',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'GET',
        };
      },
      transformResponse: (response) => {
        return response.pages;
      },
      providesTags: (result = [], error, arg) => [
        'Page',
        result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),

    getPage: builder.query({
      query: ({ accessToken, pageId }) => {
        return {
          url: '/page/getPageById',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'GET',
          params: { pageId },
        };
      },
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),

    addPage: builder.mutation({
      query: (accessToken) => {
        return {
          url: '/page/add',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'POST',
        };
      },
      invalidatesTags: ['Page'],
    }),

    editPage: builder.mutation({
      query: ({ content, accessToken }) => {
        return {
          url: '/page/edit',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'POST',
          body: { content },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
  }),
});

export const {
  useEditPageMutation,
  useGetPageQuery,
  useLazyGetPageQuery,
  useAddPageMutation,
  useGetPagesQuery,
} = extendedApiSlice;

// export const {  } = userSlice.actions;
export default pageSlice.reducer;
