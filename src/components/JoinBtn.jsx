import css from "../pages/LandingPage.module.css"
import { useNavigate } from "react-router-dom";

function JoinBtn() {
  const navigate = useNavigate();

  return (
    <div className={css.joinBtnHeroDiv}>
      <button className={css.joinBtnHero} onClick={() => navigate("/checkout")}>
        Join the real code
      </button>
      <p>Join 113,000+ like-minded students</p>
    </div>
  );
}

export default JoinBtn;
