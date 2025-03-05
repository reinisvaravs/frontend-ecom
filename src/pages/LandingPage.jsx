import logo from "../assets/react.svg";
import css from "./LandingPage.module.css";
import { Navigate, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className={css.headerLogo}>
          <h1>The Real World</h1>
          <img src={logo} alt="Logo" />
        </div>
        <div className={css.headerList}>
          <ul>
            <li>Feature</li>
            <li>Interviews</li>
            <li>Student Wins</li>
            <li>Courses</li>
            <li>About Andrew</li>
          </ul>
        </div>
        <div className={css.headerButtons}>
          <button className={css.loginBtn} onClick={() => navigate("/login")}>Log in</button>
          <button className={css.joinBtn} onClick={() => navigate("/checkout")}>
            Join Now
          </button>
        </div>
      </header>
    </>
  );
}
export default LandingPage;
