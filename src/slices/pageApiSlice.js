import apiSlice from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMetaAllPages: builder.query({
      query: (accessToken) => {
        return {
          url: '/page/getMetaAllPages ',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'GET',
        };
      },
      transformResponse: (response) => {
        return response.pages;
      },
      providesTags: (result = [], error, arg) => {
        return ['Page', result.map(({ id }) => ({ type: 'Page', id }))];
      },
    }),

    getMetaPage: builder.query({
      query: ({ accessToken, pageId }) => {
        return {
          url: '/page/getMetaPage',
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
      query: ({ accessToken, parentId=null }) => {
        return {
          url: '/page',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'POST',
          params: parentId ? { parentId } : {},
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
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Page', id: arg.id }];
      },
      transformErrorResponse: (err) => {
        console.log('err', err);
      },
    }),

    deletePage: builder.mutation({
      query: ({ accessToken, pageId }) => {
        return {
          url: '/page',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'DELETE',
          params: { pageId },
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
  useDeletePageMutation,
  useGetMetaAllPagesQuery,
  useLazyGetMetaPageQuery,
} = extendedApiSlice;
