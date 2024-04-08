import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ActivityStyle.css";

export default function ActivitiesList() {
  const [activities, setActivities] = useState("");

  const getActivities = async () => {
    try {
      const allAct = await axios.get("http://localhost:5005/activity");
      setActivities(allAct.data);
    } catch (err) {
      console.log("Error fetching all activities", err);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  // console.log(activities);
  if (!activities) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="activity-list">
        <h1>Activity List</h1>
        <Link to="/activity-form">
          <button>Add an activity</button>
        </Link>
        {activities.length > 0 ? (
          activities.map((oneAct) => {
            return (
              <Link key={oneAct._id} to={`/activity-list/${oneAct._id}`}>
                <div>
                  <img src={oneAct.thumbnail} alt={oneAct.title} />
                  <h2>{oneAct.title}</h2>
                  <h4>{oneAct.location}</h4>
                  <p>{oneAct.price}€ p.p</p>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No activities found</p>
        )}
      </div>
    </div>
  );
}
