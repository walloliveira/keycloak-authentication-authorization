import { createContext } from "react";

const ModalContext = createContext({
  isCreationOpen: false,
  isConfirmationOpen: false,
});

export default ModalContext;
