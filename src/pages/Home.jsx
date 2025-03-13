import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGotoLogin = () => {
    navigate("/login");
  };

  const handleGotoRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <h1>Hello!</h1>
      <button onClick={handleGotoLogin}>Log in</button>
      <button onClick={handleGotoRegister}>Register</button>
    </>
  );
}

export default Home;
