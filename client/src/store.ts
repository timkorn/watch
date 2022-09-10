import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import filmPageInfoSlice from "./features/filmPageInfoSlice";
import searchFilmsSlice from "./features/searchFilmsSlice";
import watchlistSlice from "./features/watchlistSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    searchOfFilms: searchFilmsSlice,
    filmInfo: filmPageInfoSlice,
    watchlist: watchlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
