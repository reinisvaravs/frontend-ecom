import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BACKEND_URL from "../config/globalVar";
import { BackButton } from "./Navbar";

function AuthPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromURL = params.get("email");

    if (emailFromURL) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        email: emailFromURL || prevUserData.email, // Only updates if not empty
      }));
    }
  }, []);

  const handleLogin = async () => {
    let validationErrors = {};

    // ✅ 1️⃣ Client-side validation (avoids unnecessary requests)
    if (!userData.email) {
      validationErrors.email = "Email is required";
    }
    if (!userData.password) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // ⛔ Stop here if validation fails
    }

    const requestBody = {
      email: userData.email,
      password: userData.password,
    };

    try {
      // ✅ 2️⃣ Send request to backend
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // ✅ 3️⃣ Handle response errors (invalid credentials, missing fields, etc.)
      if (!response.ok) {
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          const validationErrors = {};
          data.errors.forEach((err) => {
            if (err.param) {
              validationErrors[err.param] = err.msg; // Field-specific errors
            }
          });

          setErrors(validationErrors); // ✅ Set errors for individual fields
        } else {
          setErrors({
            form: data.message || "An error occurred. Please try again.",
          });
        }
        return;
      }

      // ✅ 4️⃣ Store JWT Token (used for protected routes)
      localStorage.setItem("Token", data.token);

      // ✅ 5️⃣ Redirect to home page after successful login
      navigate("/");

      // ✅ 6️⃣ Reset errors if login is successful
      setErrors({});
    } catch (error) {
      console.error("❌ Network Error:", error.message);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

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

      <h1 style={{ marginBottom: "20px" }}>Sign in</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => {
            setUserData((prevUserData) => ({
              ...prevUserData,
              email: e.target.value,
            }));
            setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
          }}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            fontSize: "14px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserData((prevUserData) => ({
              ...prevUserData,
              password: e.target.value,
            }));
            setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
          }}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            fontSize: "14px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}
      </div>

      <button
        onClick={handleLogin}
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

export default AuthPage;
