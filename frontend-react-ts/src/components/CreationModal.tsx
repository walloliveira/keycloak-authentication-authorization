interface CreationModalProps {
  title: string;
  className?: string;
  children: JSX.Element;
  isOpen: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const CreationModal = (props: CreationModalProps) => {
  let className = "modal";
  if (props.isOpen) {
    className += " is-active";
  }
  return (
    <div className={className}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
        </header>
        <section className="modal-card-body">{props.children}</section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={props.onSave}>
            Save
          </button>
          <button className="button" onClick={props.onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreationModal;
