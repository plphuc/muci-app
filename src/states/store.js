import apiSlice from "./apiSlice";
import userReducer from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware()
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store