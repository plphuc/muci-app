const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
});

// export const {} = pageSlice.actions;
export default pageSlice.reducer;
