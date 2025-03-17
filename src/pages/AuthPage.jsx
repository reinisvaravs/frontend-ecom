import css from "./AuthPage.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      const response = await fetch(`${VITE_API_BASE_URL}/api/login`, {
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
    <>
      <div className={css.bg}></div>
      <div className={css.containercontainer}>
        <div className={css.container}>
          <button className={css.back} onClick={() => navigate("/login")}>
            <IoIosArrowBack className={css.arrow} />
            <p>Back</p>
          </button>
          <h2 className={css.h2}>Sign in to your account</h2>
          <div className={css.inputDiv}>
            <input
              className={css.input}
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              value={userData.email}
              onChange={(e) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  email: e.target.value,
                }));
                setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
              }}
            />
            {errors.email && (
              <div className={css.errorDiv}>
                <p className={css.error}>{errors.email}</p>
              </div>
            )}
            <input
              className={css.input}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  password: e.target.value,
                }));
                setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
              }}
            />
            {errors.password && (
              <div className={css.errorDiv}>
                <p className={css.error}>{errors.password}</p>
              </div>
            )}
            {errors.form && (
              <div className={css.errorDiv}>
                <p className={css.error}>{errors.form}</p>
              </div>
            )}
          </div>
          <button className={css.forgotPassword}>Forgot your password?</button>
          <button className={css.loginBtn} onClick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
