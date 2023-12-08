import apiSlice from './apiSlice.js';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import tokenReducer from './tokenSlice.js'
import pageReducer from './pageSlice.js';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    page: pageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
