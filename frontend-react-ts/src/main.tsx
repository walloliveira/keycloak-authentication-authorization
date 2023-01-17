import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Keycloak from "keycloak-js";
import "./app.css";

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
      const { token, authenticated } = keycloak;
      ReactDOM.createRoot(
        document.getElementById("root") as HTMLElement
      ).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
initKeycloak();
