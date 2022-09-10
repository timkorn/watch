import req from "../../utils/axios";
import Router from "next/router";
import jwt_decode from "jwt-decode";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCookie from "../../utils/getCookie";
import { toast } from "react-toastify";

interface initialStateProps {
  refresher: number | null;
  userId: string | null;
}

const initialState: initialStateProps = {
  userId: null,
  refresher: null,
};
export const login = createAsyncThunk(
  "auth/login",
  async (authData: { email: string; password: string }) => {
    const response = req("post", "auth/login", authData);
    return (await response).data;
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (authData: { email: string; password: string }) => {
    const response = req("post", "auth/register", authData);
    return (await response).data;
  }
);
export const refresh = createAsyncThunk("auth/refreshToken", async () => {
  console.log("begin refresh...");
  const response = req("get", "auth/refreshToken", null);
  return (await response).data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeRefresher: (state, action) => {
      state.refresher = action.payload;
    },
    logout: (state) => {
      state.refresher = null;
      state.userId = null;
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      Router.push("/login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      if (state.refresher) {
        clearInterval(state.refresher);
        state.refresher = null;
      }
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      const decoded: { userId: string } = jwt_decode(accessToken);
      state.userId = decoded.userId;
      document.cookie = `accessToken=${accessToken}`;
      document.cookie = `refreshToken=${refreshToken}`;
      Router.push("/");
    });
    builder.addCase(register.rejected, (state, action) => {
      toast.error("this email exists!");
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (state.refresher) {
        clearInterval(state.refresher);
        state.refresher = null;
      }
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      const decoded: { userId: string } = jwt_decode(accessToken);
      state.userId = decoded.userId;
      document.cookie = `accessToken=${accessToken}`;
      document.cookie = `refreshToken=${refreshToken}`;
      Router.push("/");
    });
    builder.addCase(login.rejected, (state, action) => {
      toast.error("incorrect login or password!");
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      const decodedCook: { userId: string } = jwt_decode(accessToken);
      const decodedReq: { userId: string } = jwt_decode(
        getCookie("accessToken")!
      );
      if (decodedCook.userId == decodedReq.userId) {
        document.cookie = `accessToken=${accessToken}`;
        document.cookie = `refreshToken=${refreshToken}`;
      }
      if (state.userId === null) {
        state.userId = decodedReq.userId;
      }
    });
    builder.addCase(refresh.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});
export const { changeRefresher, logout } = authSlice.actions;
export default authSlice.reducer;
