import css from "./Login.module.css";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import videoBg from "../../assets/videos/matrix.mp4";
import logo_yellow from "../../assets/images/trc_logo_yellow.png"

function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="videoDiv">
        <video
          src={videoBg}
          className="video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className={css.container}>
        <img src={logo_yellow} className={css.logo} />
        <BsArrowReturnLeft
          className={css.arrow}
          onClick={() => navigate("/")}
        />
        <h1 className={css.h1}>The real code portal</h1>
        <h2 className={css.h2}>
          Login to <b>The Real Code</b> app
        </h2>
        <h2 className={css.h2}>
          Stop procrastinating. Start <b>coding</b>.
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
