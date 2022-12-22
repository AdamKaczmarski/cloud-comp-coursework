import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("cuoldle_token"),
};

export const auth = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setToken(state, action) {
      sessionStorage.setItem("cuoldle_token",action.payload)
      state.token = action.payload;

    },
  },
});

export const { setToken } = auth.actions;

export default auth.reducer;
