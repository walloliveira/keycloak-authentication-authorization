import { configureStore, createAction, createSlice } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";

type AuthKeycloak = {};

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: "",
  },
  reducers: {
    setKeycloak(state, { payload }) {
      state.token = payload;
    },
  },
});

export const { setKeycloak } = authSlice.actions;

export default authSlice.reducer;
