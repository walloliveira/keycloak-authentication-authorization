import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

export default configureStore({
  reducer: {
    auth: AuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload"],
        ignoredPaths: ["auth.keycloak"],
      },
    }),
});
