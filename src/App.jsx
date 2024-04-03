import { useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import HomePage from "./pages/HomePage";
import IsProtected from "./components/IsProtected";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IsProtected>
              <HomePage />
            </IsProtected>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<h1> 404 Not found</h1>} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
