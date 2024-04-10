import React, { useState, useEffect } from "react";
import "../styles/NavigationBarStyle.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function NavigationBar() {
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  // console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    nav("/");
  };

  return (
    <div className="navigation-bar">
      <button onClick={() => nav("/dashboard")}>Dashboard</button>
      <button onClick={() => nav(`/user/${user._id}`)}>Profile</button>
      <button onClick={() => nav("/lodging-list")}>Accomodations</button>
      <button onClick={() => nav("/activity-list")}>Activities</button>
      <button>Alert!</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
