export default function ErrorMessage(props: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="alert alert-danger" role="alert">
      <p>{props.message}</p>
      {props.onRetry && (
        <button className="btn btn-outline-primary" onClick={props.onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
}
