import React from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <button onClick={localStorage.removeItem("authToken")}>Log out</button>
    </>
  );
}
