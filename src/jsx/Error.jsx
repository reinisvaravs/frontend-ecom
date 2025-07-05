import { useNavigate } from "react-router-dom";

function ErrorPage() {
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
      <h1 style={{ marginBottom: "20px" }}>404</h1>
      <p style={{ marginBottom: "20px" }}>
        The page you are looking for doesn't exist or has been moved. Please go
        back to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
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
        Go back home
      </button>
    </div>
  );
}

export default ErrorPage;
