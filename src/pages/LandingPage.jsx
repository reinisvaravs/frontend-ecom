import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "./LandingPage.module.css";
import { IoSchool } from "react-icons/io5";
import postgreLogo from "../assets/postgre.svg";
import expressLogo from "../assets/express.svg";
import reactLogo from "../assets/react.svg";
import nodeLogo from "../assets/node.svg";
import stripeLogo from "../assets/stripe.svg";
import videoFile from "../assets/car.mp4";

const VITE_API_BASE_URL = "https://backend-ecom-gbzk.onrender.com";

export const isTokenExpired = (token) => {
  if (!token) return true; // If no token, consider it expired

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return payload.exp < currentTime; // Check if token is expired
  } catch (error) {
    return true; // If decoding fails, consider token expired
  }
};

function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("Token");
      navigate("/");
      return;
    }

    fetch(`${VITE_API_BASE_URL}/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.error("❌ Error fetching profile:", err));
  }, []);

  useEffect(() => {
    const infoElement = document.querySelector(`.${css.info}`);

    const handleScroll = () => {
      if (!infoElement || !progressBarRef.current) return;

      const scrollTop = window.scrollY;
      const infoOffsetTop = infoElement.offsetTop;
      const infoHeight = infoElement.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollProgress =
        (scrollTop - infoOffsetTop + windowHeight) /
        (infoHeight + windowHeight);
      const percent = Math.min(Math.max(scrollProgress, 0), 1) * 100;

      progressBarRef.current.style.height = `${percent}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={css.landingPage}>
      {/* <div className={css.bg}></div> */}
      <header className={css.header}>
        <div className={css.headerLogo}>
          <IoSchool className={css.logo1} />
          <h1>The Real Code</h1>
        </div>
        <div className={css.headerList}>
          <ul>
            <li>Features</li>
            <li>Pricing</li>
            <li>How to use</li>
            <li>Roadmap</li>
          </ul>
        </div>
        <div className={css.headerButtons}>
          {user ? (
            <>
              <p style={{ color: "white" }}>Hello {user.first_name}!</p>
              <button
                className={css.loginBtn}
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
            </>
          ) : (
            <>
              <button
                className={css.loginBtn}
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
              <button
                className={css.joinBtn}
                onClick={() => navigate("/checkout")}
              >
                Join Now
              </button>
            </>
          )}
        </div>
      </header>
      <main className={css.main}>
        <h1>
          Money making is <b>a skill</b>
        </h1>
        <h2>
          We will teach you how to <b>master it</b>
        </h2>
        <div className={css.videoContainer}>
          <video width="100%" controls className={css.video}>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={css.joinBtnHeroDiv}>
          <button
            className={css.joinBtnHero}
            onClick={() => navigate("/checkout")}
          >
            Join the real code
          </button>
          <p>Join 113,000+ like-minded students</p>
        </div>
        <div className={css.info}>
          <div className={css.progressBarDiv}>
            <div ref={progressBarRef} className={css.progressBar}></div>
          </div>
          <div className={css.infoContent}></div>
        </div>
      </main>
      <footer className={css.stackIconDiv}>
        <img src={postgreLogo} alt="postgreLogo" className={css.stackIcons} />
        <img src={expressLogo} alt="expressLogo" className={css.stackIcons} />
        <img src={reactLogo} alt="reactLogo" className={css.stackIcons} />
        <img src={nodeLogo} alt="nodeLogo" className={css.stackIcons} />
        <img src={stripeLogo} alt="stripeLogo" className={css.stackIcons} />
      </footer>
    </div>
  );
}

export default LandingPage;
