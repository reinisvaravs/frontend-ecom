import css from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { IoSchool } from "react-icons/io5";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <header className={css.header}>
        <div className={css.headerLogo}>
          <h1>The Real Code</h1>
          <IoSchool className={css.logo1} />
        </div>
        <div className={css.headerList}>
          <ul>
            <li>Feature</li>
            <li>Interviews</li>
            <li>Student Wins</li>
            <li>Courses</li>
            <li>About Reinis</li>
          </ul>
        </div>
        <div className={css.headerButtons}>
          <button className={css.loginBtn} onClick={() => navigate("/login")}>
            Log in
          </button>
          <button className={css.joinBtn} onClick={() => navigate("/checkout")}>
            Join Now
          </button>
        </div>
      </header>
    </>
  );
}
export default LandingPage;
