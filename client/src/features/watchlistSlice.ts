import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import req from "../../utils/axios";
import { store } from "../store";

interface initialStateProps {
  watchlist: any[] | null;
  isLoading: boolean;
}
const initialState: initialStateProps = {
  watchlist: null,
  isLoading: true,
};

export const getWatchlist = createAsyncThunk(
  "/getWatchlist",
  async (data: { userId: string }) => {
    const response = req("post", "/films/getWatchlist", data);
    return (await response).data;
  }
);

export const addToWatchlist = createAsyncThunk(
  "/films/setFilmToWatchlist",
  async (data: { userId: string; filmId: string }) => {
    const response = req("post", "/films/setFilmToWatchlist", data);
    return (await response).data;
  }
);

export const deleteFromWatchList = createAsyncThunk(
  "/films/deleteFromWatchlist",
  async (data: { userId: string; filmId: string }) => {
    const response = req("post", "/films/deleteFromWatchlist", data);
    return (await response).data;
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    removeElement: (state, action) => {
      const filmId = action.payload;
      state.watchlist = state.watchlist!.filter(
        (item) => item.kinopoiskId != filmId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToWatchlist.fulfilled, (state, action) => {
      console.log("hello");
    });
    builder.addCase(addToWatchlist.rejected, (state, action) => {
      if (action.error.code == "ERR_BAD_REQUEST") {
        toast.error("watchlist limit exeeded!");
      }
    });
    builder.addCase(getWatchlist.fulfilled, (state, action) => {
      state.watchlist = action.payload.filmsData;
      state.isLoading = false;
    });
    builder.addCase(getWatchlist.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});
export const { removeElement } = watchlistSlice.actions;
export default watchlistSlice.reducer;
