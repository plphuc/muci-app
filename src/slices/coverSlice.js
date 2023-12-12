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
      query: ({ cover, accessToken }) => {
        console.log(cover);
        return {
          url: 'page/cover/save',
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          method: 'POST',
          body: cover,
        };
      },
    }),
  }),
});

export const { useSaveCoverMutation } = extendedApiSlice;
export default coverSlice.reducer;
