import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    keycloak: {} as Keycloak | undefined,
  },
  reducers: {
    setKeycloak(state, action: PayloadAction<Keycloak>) {
      state.keycloak = action.payload;
    },
    logout(state) {
      state.keycloak?.logout().then(() => (state.keycloak = undefined));
    },
  },
});

export const { setKeycloak, logout } = authSlice.actions;

export default authSlice.reducer;
