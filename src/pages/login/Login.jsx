import css from "./Login.module.css";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoSchool } from "react-icons/io5";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={css.bg}></div>
      <div className={css.container}>
        <IoSchool className={css.logo} />
        <BsArrowReturnLeft className={css.arrow} onClick={() => navigate("/")} />
        <h1 className={css.h1}>The real code portal</h1>
        <h2 className={css.h2}>
          Login to <b>The Real Code</b> app
        </h2>
        <h2 className={css.h2}>
          Stop procrastinating. Start <b>making money</b> instead.
        </h2>
        <button className={css.signupBtn} onClick={() => navigate("/checkout")}>
          <p>I don't have an account</p>
        </button>
        <button className={css.loginBtn} onClick={() => navigate("/auth")}>
          Log in
        </button>
      </div>
    </>
  );
}

export default LoginPage;
