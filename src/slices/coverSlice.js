const { createSlice } = require('@reduxjs/toolkit');
const { default: apiSlice } = require('./apiSlice');

const initialState = null;

const coverSlice = createSlice({
  name: 'cover',
  initialState,
  reducers: {},
});

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveCover: builder.mutation({
      query: ({ cover, pageId, accessToken }) => {
        return {
          url: 'page/cover/',
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          method: 'POST',
          params: {pageId},
          body: cover,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Page', id: arg.pageId }]
      },
    }),
    getCover: builder.query({
      query: ({ pageId, coverId, accessToken }) => {
        return {
          url: '/page/cover/',
          method: 'GET',
          params: {
            pageId,
            coverId,
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          responseHandler: (response) => {
            return response.blob()
          },
        };
      },
      transformResponse: async (response) => {
        return URL.createObjectURL(response);
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
    removeCover: builder.mutation({
      query: ({ pageId, coverId, accessToken }) => {
        return {
          url: '/page/cover/',
          method: 'DELETE',
          params: {
            pageId,
            coverId
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Page', id: arg.pageId }]
      },
    })
  }),
});

export const { useSaveCoverMutation, useLazyGetCoverQuery, useRemoveCoverMutation } = extendedApiSlice;
export default coverSlice.reducer;
