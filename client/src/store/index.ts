import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { commentsApi } from "./api/commentApi";
import { strapiApi } from "./api/strapiApi";

export const store = configureStore({
  reducer: {
    [commentsApi.reducerPath]: commentsApi.reducer,
    [strapiApi.reducerPath]: strapiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentsApi.middleware, strapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
