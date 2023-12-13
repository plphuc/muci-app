import apiSlice from './apiSlice';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
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
    }),
    
    getPage: builder.query({
      query: ({accessToken, pageId}) => {
        return {
          url: '/page/getId',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'GET',
          body: {pageId}
        };
      },
    }),
    savePage: builder.mutation({
      query: ({content, accessToken}) => {
        return {
          url: '/page/save',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'POST',
          body: {content},
        };
      },
    }),
    editPage: builder.mutation({
      query: ({content, accessToken}) => {
        return {
          url: '/page/edit',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'POST',
          body: {content},
        };
      },
    }),
  }),
});

export const { useEditPageMutation, useGetPageQuery, useSavePageMutation, useGetPagesQuery } = extendedApiSlice;

// export const {  } = userSlice.actions;
export default pageSlice.reducer;
