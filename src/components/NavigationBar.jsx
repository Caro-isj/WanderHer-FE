import React from "react";
import "../styles/NavigationBarStyle.css";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {

     const nav = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <div className="navigation-bar">
      <button onClick={() => nav("/dashboard")}>Dashboard</button>
      <button>Profile</button>
      <button>Accomodations</button>
      <button>Activities</button>
      <button>Alert!</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
