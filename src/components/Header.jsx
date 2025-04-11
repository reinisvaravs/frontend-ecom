import css from "../pages/home/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo_yellow from "../assets/images/trc_logo_yellow.png"

const VITE_API_BASE_URL = "https://e-commerce-backend-8eso.onrender.com";

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

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  return (
    <header className={css.header}>
      <div className={css.headerLogo}>
        <h1>The Real Code</h1>
        <img src={logo_yellow} className={css.logo1} />
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
            <button className={css.loginBtn} onClick={() => navigate("/login")}>
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
  );
}

export default Header;
