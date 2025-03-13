import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Hello!</h1>
      <button onClick={navigate("/login")}>Log in</button>
      <button onClick={navigate("/register")}>Register</button>
    </>
  );
}

export default Home;
