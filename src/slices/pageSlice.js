const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  statusCode: 200,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
});

export const {} = pageSlice.actions;
export default pageSlice.reducer;
