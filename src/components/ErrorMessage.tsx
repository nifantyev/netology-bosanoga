export default function ErrorMessage(props: { message: string }) {
  return (
    <div className="alert alert-danger" role="alert">
      {props.message}
    </div>
  );
}
