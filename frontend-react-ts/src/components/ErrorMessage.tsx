interface ErrorMessageProps {
  reason?: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <>
      {props.reason && (
        <article className="message is-danger">
          <div className="message-body">{props.reason}</div>
        </article>
      )}
    </>
  );
};

export default ErrorMessage;
