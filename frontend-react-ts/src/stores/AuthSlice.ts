import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    keycloak: {} as Keycloak,
  },
  reducers: {
    setKeycloak(state, action: PayloadAction<Keycloak>) {
      state.keycloak = action.payload;
    },
  },
});

export const { setKeycloak } = authSlice.actions;

export default authSlice.reducer;
