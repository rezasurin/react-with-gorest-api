import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { customerApi } from "./customer";

const fakeLoginReq = (username, password) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      username === "admin" && password === "admin" ? resolve({success: true, message: "Login success", user: username}) : reject({success: false, message: "Username or password was wrong"});
    }, 1000),
  );

export const fakeLogin = createAsyncThunk("auth/fakeLogin", async (payload, thunkAPI) => {
  try {
    const response = await fakeLoginReq(payload.username, payload.password)
    return response

  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const initState = {
  user: null,
  isLogin: false,
  isLoading: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
  },
  extraReducers: {
    [fakeLogin.pending]: (state, payload) => {
      state.isLoading = true
    },
    [fakeLogin.fulfilled]: (state, payload) => {
      state.isLoading = false
      state.isLogin = true
      state.user = payload.user
      
    },
    [fakeLogin.rejected]: (state, payload) => {
      state.isLoading = false
      state.isLogin = false
      
    }
  }
});

