import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BACKEND_URL from "../config/globalVar";

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("Token");
      return;
    }

    fetch(`${BACKEND_URL}/api/profile`, {
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
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Ecommerce</h1>

      {user ? (
        <div>
          <p style={{ marginBottom: "20px" }}>Hello {user.first_name}!</p>
          <button
            onClick={() => navigate("/profile")}
            style={{
              background: "none",
              border: "1px solid black",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "black";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "black";
            }}
          >
            Profile
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "1px solid black",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              marginBottom: "20px",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "black";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "black";
            }}
          >
            Sign in
          </button>
          <br />
          <button
            onClick={() => navigate("/checkout")}
            style={{
              background: "none",
              border: "1px solid black",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "black";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "black";
            }}
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
