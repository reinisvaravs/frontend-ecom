import css from "./Error.module.css";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <h1>404</h1>
      <p>
        The page you are looking for doesn't exist Neo or has been moved. Please
        go back to the homepage.
      </p>
      <button className={css.joinBtn} onClick={() => navigate("/")}>Go back home</button>
    </div>
  );
}

export default ErrorPage;
