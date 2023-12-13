import apiSlice from './apiSlice.js';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import tokenReducer from './tokenSlice.js'
import pageReducer from './pageSlice.js';
import coverReducer from './coverSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    token: tokenReducer,
    user: userReducer,
    page: pageReducer,
    cover: coverReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
