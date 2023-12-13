const { createSlice } = require('@reduxjs/toolkit');

const initialState = null;

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
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

export const { saveAccessToken, resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
