import { configureStore } from "@reduxjs/toolkit";
import AuthStore from "./AuthStore";

export default configureStore({
  reducer: {
    auth: AuthStore,
  },
});
