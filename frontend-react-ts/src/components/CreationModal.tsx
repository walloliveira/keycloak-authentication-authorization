import ModalContext from "../contexts/ModalContext";
import Modal from "./Modal";

interface CreationModalProps {
  children: JSX.Element;
  onCancel: () => void;
  onSave: () => void;
}

const CreationModal = (props: CreationModalProps) => {
  return (
    <ModalContext.Consumer>
      {(context) => (
        <Modal
          isOpen={context.isCreationOpen}
          children={props.children}
          title="Create a new color"
          actions={
            <>
              <button className="button" onClick={props.onCancel}>
                Cancel
              </button>
              <button className="button is-success" onClick={props.onSave}>
                Save
              </button>
            </>
          }
        ></Modal>
      )}
    </ModalContext.Consumer>
  );
};

export default CreationModal;
