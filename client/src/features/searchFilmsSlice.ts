import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import { toast } from "react-toastify";
import req from "../../utils/axios";
import { addToWatchlist } from "./watchlistSlice";

interface initialStateProps {
  searchedFilms: any[] | null;
  isLoading: boolean;
  isFilmsSearch: boolean;
}
const initialState: initialStateProps = {
  searchedFilms: null,
  isLoading: true,
  isFilmsSearch: false,
};

export const searchFilms = createAsyncThunk(
  "films/search",
  async (data: { search: string; userId: string }) => {
    const response = req("post", "films/search", data);
    return (await response).data;
  }
);

const searchFilmsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMakeSearch: (state) => {
      state.isFilmsSearch = true;
      state.isLoading = true;
    },
    makeChosen: (state, action) => {
      state.searchedFilms?.forEach((item) => {
        if (item.filmId == action.payload) {
          item.pending = true;
          item.chosen = true;
        }
      });
    },
    deleteChosen: (state, action) => {
      state.searchedFilms?.forEach((item) => {
        if (item.filmId == action.payload) {
          item.chosen = false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchFilms.fulfilled, (state, action) => {
      state.searchedFilms = action.payload.films;
      state.isLoading = false;
    });
    builder.addCase(searchFilms.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addToWatchlist.fulfilled, (state, action) => {
      const film = state.searchedFilms?.find(
        (item: any) => action.meta.arg.filmId == item.filmId
      );
      if (film) {
        film.pending = false;
        film.chosen = true;
      }
    });
    builder.addCase(addToWatchlist.rejected, (state, action) => {
      const film = state.searchedFilms?.find(
        (item: any) => action.meta.arg.filmId == item.filmId
      );
      if (film) {
        film.pending = false;
        film.chosen = false;
      }
      if (Router.asPath === "/") {
        toast.error("watchlist limit exeeded!");
      }
    });
  },
});
export const { setMakeSearch, makeChosen, deleteChosen } =
  searchFilmsSlice.actions;
export default searchFilmsSlice.reducer;
