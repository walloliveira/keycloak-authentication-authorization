import { reactive } from "vue";
import Keycloak from "keycloak-js";

const state = reactive({
  keycloak: {} as Keycloak | undefined,
});

const getToken = () => state.keycloak?.token;

const setKeycloak = (keycloak: Keycloak) => {
  state.keycloak = keycloak;
};

const logout = () => {
  state.keycloak?.logout().then(() => (state.keycloak = undefined));
};

export { setKeycloak, getToken, logout };
