import { useNavigate } from "react-router-dom";
import css from "./Stripe.module.css";

function Success({ h1, btnPath, textBtn }) {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <h1>{h1}</h1>
      <button className={css.joinBtn} onClick={() => navigate(`${btnPath}`)}>
        {textBtn}
      </button>
    </div>
  );
}

export default Success;
