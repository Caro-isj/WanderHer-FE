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
import ActivitiesList from "./pages/ActivitiesList";
import ActivitiesDetails from "./pages/ActivitiesDetails";
import ActivityForm from "./components/ActivityForm";

function App() {
  const [activities, setActivities] = useState("");

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
        <Route path="/lodging-list" element={<LodgingList />} />
        <Route
          path="/activity-list"
          element={
            <ActivitiesList
              activities={activities}
              setActivities={setActivities}
            />
          }
        />
        <Route
          path="/activity-list/:activityId"
          element={
            <ActivitiesDetails
              activities={activities}
              setActivities={setActivities}
            />
          }
        />

        <Route path="/activity-form" element={<ActivityForm />} />

        <Route path="*" element={<h1> 404 Not found</h1>} />
      </Routes>
      <NavigationBar />
    </>
  );
}

export default App;
