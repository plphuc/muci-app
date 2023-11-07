import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from 'api/client';

const initialState = {
  status: 'idle',
  user: null,
  tokens: null,
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData) => {
    const response = await client.post('/auth/register', registerData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { tokens, user } = action.payload;
        return {
          ...state,
          status: 'succeeded',
          user: user,
          tokens: tokens,
          error: null
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          user: null,
          tokens: null,
          error: action.error.message,
        };
      });
  },
});

export default userSlice.reducer