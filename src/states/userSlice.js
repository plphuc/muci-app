import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from 'api/client';

const initialState = {
  status: 'idle',
  user: null,
  tokens: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    refreshUser: {
      reducer() {
        return {
          ...initialState
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        return {
          ...state,
          status: 'loading',
          error: null
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

export const {
  refreshUser
} = userSlice.actions

export const {useRegisterUserMutation} = 
export default userSlice.reducer