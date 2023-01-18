import { reactive } from "vue";
import Keycloak from "keycloak-js";

const state = reactive({
  keycloak: {} as Keycloak,
});

const getToken = () => state.keycloak.token;

const setKeycloak = (keycloak: Keycloak) => {
  state.keycloak = keycloak;
};

export { setKeycloak, getToken };
