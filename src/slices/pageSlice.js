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
        result.map(({ id }) => ({ type: 'Page', id })),
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
      transformResponse: (response) => {
        return response.page;
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'Page', id: arg.pageId }];
      },
    }),

    addPage: builder.mutation({
      query: (accessToken) => {
        return {
          url: '/page',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'POST',
        };
      },
      invalidatesTags: ['Page'],
      transformResponse: (response) => {
        return response.id;
      },
    }),

    editPage: builder.mutation({
      query: ({ accessToken, pageId, content }) => {
        return {
          url: '/page',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'PUT',
          params: { pageId },
          body: { ...content },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Page', id: arg.id }],
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
