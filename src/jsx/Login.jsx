import { useNavigate } from "react-router-dom";
import { BackButton } from "./Navbar";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <BackButton />
      <h1 style={{ marginBottom: "20px" }}>Login</h1>
      <button
        onClick={() => navigate("/checkout")}
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
        I don't have an account
      </button>
      <br />
      <button
        onClick={() => navigate("/auth")}
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
        Log in
      </button>
    </div>
  );
}

export default LoginPage;
