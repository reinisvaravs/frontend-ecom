import css from "../pages/home/Home.module.css";
import { useNavigate } from "react-router-dom";
import profileIcon from "../assets/images/profiles4.webp";

function JoinBtn({ style }) {
  const navigate = useNavigate();

  return (
    <div className={css.joinBtnHeroDiv} style={style}>
      <button className={css.joinBtnHero} onClick={() => navigate("/checkout")}>
        Join the real code
      </button>
      <div className={css.joinBtnP}>
        <img src={profileIcon} className={css.profileImg} />
        <p>Join 113,000+ like-minded students</p>
      </div>
    </div>
  );
}

export default JoinBtn;
