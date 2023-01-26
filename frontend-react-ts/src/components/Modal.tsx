interface CreationModalProps {
  title: string;
  children: JSX.Element;
  actions: JSX.Element;
  isOpen: boolean;
}

const Modal = (props: CreationModalProps) => {
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
        <footer className="modal-card-foot">{props.actions}</footer>
      </div>
    </div>
  );
};

export default Modal;
