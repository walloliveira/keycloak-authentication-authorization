import { faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorView from "./views/ColorView";
import Keycloak from "keycloak-js";
import { setKeycloak } from "./stores/AuthSlice";
import AuthStore from "./stores/AuthStore";

interface AppProps {
  keycloak: Keycloak;
}

const App = ({ keycloak }: AppProps) => {
  AuthStore.dispatch(setKeycloak(keycloak));
  return (
    <>
      <header className="container mt-1">
        <div className="is-flex is-justify-content-center is-align-content-center">
          <FontAwesomeIcon className="title is-3" icon={faWandSparkles} />
          <span className="title is-3">
            Keycloak authentication and authorization
          </span>
        </div>
      </header>
      <main className="container mt-6">
        <ColorView />
      </main>
    </>
  );
};

export default App;
