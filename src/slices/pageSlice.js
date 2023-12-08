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
    savePage: builder.mutation({
      query: ({content, accessToken, userId}) => {
        console.log(userId);
        return {
          url: '/page/save',
          headers: { authorization: `Bearer ${accessToken}` },
          method: 'POST',
          body: {content, userId},
        };
      },
    }),
  }),
});

export const { useSavePageMutation } = extendedApiSlice;

// export const {  } = userSlice.actions;
export default pageSlice.reducer;
