import { createApp } from "vue";
import Keycloak from "keycloak-js";
import App from "./App.vue";
import "./app.css";
import store from "./stores/auth-store";

const initKeycloak = () => {
  const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_SERVER_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  });
  keycloak
    .init({
      onLoad: "login-required",
    })
    .then(() => {
      store.authToken = keycloak.token!;
      store.isAuthenticated = keycloak.authenticated!;
      console.log(store);
      createApp(App).mount("#app");
    })
    .catch((err) => {
      console.log(err);
    });
};
initKeycloak();
