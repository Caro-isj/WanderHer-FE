import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import HomePage from "./pages/HomePage";
import IsProtected from "./components/IsProtected";
import Dashboard from "./pages/Dashboard";
import LodgingList from "./pages/LodgingList";
import NavigationBar from "./components/NavigationBar";
import CreateLodging from "./pages/CreateLodging";
import EditLodging from "./components/EditLodging";
import LodgingDetails from "./pages/LodgingDetails";
import UserProfileEdit from "./pages/UserProfileEdit";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/dashboard"
          element={
            <IsProtected>
              <Dashboard />
            </IsProtected>
          }
        />
        <Route
          path="/lodging-list"
          element={
            <IsProtected>
              <LodgingList />
            </IsProtected>
          }
        />
        <Route
          path="/create-lodging"
          element={
            <IsProtected>
              <CreateLodging />
            </IsProtected>
          }
        />
        <Route
          path="/edit-lodging/:lodgingId"
          element={
            <IsProtected>
              <EditLodging />
            </IsProtected>
          }
        />
        <Route
          path="/lodging/:lodgingId"
          element={
            <IsProtected>
              <LodgingDetails />
            </IsProtected>
          }
        />
        <Route path="*" element={<h1> 404 Not found</h1>} />

        <Route path="/user/:userId/edit" element={<UserProfileEdit />} />
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
      <NavigationBar />
    </>
  );
}

export default App;
