import React, { useState } from "react";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import { Link } from "react-router-dom";
import "../styles/HomePageStyle.css";

export default function HomePage() {
  const [view, setView] = useState(null);

  const handleSignUpClick = () => {
    setView("signUp");
  };

  const handleLoginClick = () => {
    setView("login");
  };
  return (
    <div>
      <h1>WanderHer</h1>
      <h2>"Not all of those who wander are lost."</h2>
      <div className="log-and-sign-container">
        <Link to="/signup">
          <button>SignUp</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
