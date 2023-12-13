const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      return action.payload;
    },
    resetToken: (state) => {
      localStorage.removeItem('refreshToken');
      return initialState;
    },
  },
});

export const selectAccessToken = (state) => {
  return state.token;
};

export const { saveToken, resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
