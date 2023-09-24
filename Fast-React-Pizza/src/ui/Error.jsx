import { useNavigate } from "react-router-dom";
import { useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>{error.status && `${error.status} | `}Something went wrong 🤨</h1>
      <h2>{error.data || error.message} </h2>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
