import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import { toast } from "react-toastify";
import req from "../../utils/axios";
import { addToWatchlist } from "./watchlistSlice";

interface initialStapeProps {
  filmMainInfo: any;
  isMainInfoLoading: boolean;
  additionalInfo: any[] | null;
  isAdditionalInfoLoading: boolean;
}

const initialState: initialStapeProps = {
  filmMainInfo: null,
  isMainInfoLoading: true,
  additionalInfo: null,
  isAdditionalInfoLoading: true,
};
export const getMainInfo = createAsyncThunk(
  "films/findMain",
  async (data: { filmId: string; userId: string }) => {
    const response = req("post", `films/mainInfo/${data.filmId}`, {
      userId: data.userId,
    });
    return (await response).data;
  }
);
export const getStaff = createAsyncThunk(
  "films/getStaff",
  async (data: { filmId: string; [x: string]: any }) => {
    console.log("hello");
    const response = req("get", `films/getstaff/${data.filmId}`, null);
    return (await response).data;
  }
);
const filmPageInfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    cleanInfo: (state) => {
      state.filmMainInfo = null;
      state.additionalInfo = null;
      state.isAdditionalInfoLoading = true;
      state.isMainInfoLoading = true;
    },
    makeFilmChosen: (state) => {
      state.filmMainInfo!.chosen = true;
      state.filmMainInfo!.pending = true;
    },
    deleteFilmChosen: (state) => {
      state.filmMainInfo!.chosen = false;
      state.filmMainInfo!.pending = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMainInfo.fulfilled, (state, action) => {
      state.filmMainInfo = action.payload;
      state.isMainInfoLoading = false;
    });
    builder.addCase(getMainInfo.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getStaff.fulfilled, (state, action) => {
      console.log(action.payload);
      state.additionalInfo = action.payload.actors;
      state.isAdditionalInfoLoading = false;
    });
    builder.addCase(getStaff.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addToWatchlist.fulfilled, (state, action) => {
      if (Router.asPath.split("/").includes("films")) {
        state.filmMainInfo!.pending = false;
      }
    });
    builder.addCase(addToWatchlist.rejected, (state, action) => {
      console.log(Router.asPath.split("/"));
      if (Router.asPath.split("/").includes("film")) {
        state.filmMainInfo!.chosen = false;
        state.filmMainInfo!.pending = false;
        toast.error("watchlist limit exeeded!");
      }
    });
  },
});
export const { cleanInfo, deleteFilmChosen, makeFilmChosen } =
  filmPageInfoSlice.actions;
export default filmPageInfoSlice.reducer;
