import { createApp } from "vue";
import Keycloak from "keycloak-js";
import App from "./App.vue";
import "./app.css";
import { setKeycloak } from "./stores/AuthStore";
import FontAwesomeIcon from "./plugins/Icons";

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
      setKeycloak(keycloak);
      createApp(App)
        .component("font-awesome-icon", FontAwesomeIcon)
        .mount("#app");
    })
    .catch((err) => {
      console.log(err);
    });
};
initKeycloak();
