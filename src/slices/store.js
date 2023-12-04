import apiSlice from './apiSlice.js';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import tokenReducer from './tokenSlice.js'
const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
