import ModalContext from "../contexts/ModalContext";
import Modal from "./Modal";

interface ConfirmationModalProps {
  children: JSX.Element;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  return (
    <ModalContext.Consumer>
      {(context) => (
        <Modal
          isOpen={context.isConfirmationOpen}
          children={props.children}
          title="Are you sure?"
          actions={
            <>
              <button className="button" onClick={props.onCancel}>
                Cancel
              </button>
              <button className="button is-success" onClick={props.onConfirm}>
                Confirm
              </button>
            </>
          }
        ></Modal>
      )}
    </ModalContext.Consumer>
  );
};

export default ConfirmationModal;
