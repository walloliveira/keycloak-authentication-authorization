import { faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorView from "./views/ColorView";
import Keycloak from "keycloak-js";
import { setKeycloak, logout } from "./stores/AuthSlice";
import AuthStore from "./stores/AuthStore";

interface AppProps {
  keycloak: Keycloak;
}

const App = ({ keycloak }: AppProps) => {
  AuthStore.dispatch(setKeycloak(keycloak));

  const handleLogout = () => {
    AuthStore.dispatch(logout());
  };
  return (
    <>
      <header className="container mt-1">
        <div className="is-flex is-justify-content-space-between is-align-content-center">
          <FontAwesomeIcon className="title is-3" icon={faWandSparkles} />
          <span className="title is-3">
            Keycloak authentication and authorization
          </span>
          <button className="button is-rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="container mt-6">
        <ColorView />
      </main>
    </>
  );
};

export default App;
