import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function ActivitiesDetails({ activities, setActivities }) {
  const [activity, setActivity] = useState(activities);
  const { activityId } = useParams();
  const { userId } = useParams();
  const [user, setUser] = useState({ userId });

  const nav = useNavigate();

  useEffect(() => {
    console.log("test");
    const getOneAct = async () => {
      try {
        const thisAct = await axios.get(`${API_URL}/activity/${activityId}`);
        setActivity(thisAct.data);
        console.log(thisAct.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOneAct();
  }, [activityId]);

  if (!activity) {
    <p>Loading</p>;
  }

  const update = () => {
    if (activity.host?._id === userId) {
      return (
        <button onClick={nav("/activity-list/:activityId/edit")}>
          Update activity
        </button>
      );
    }
  };

  return (
    <div className="activity-details">
      <img src={activity.images} alt={activity.title} />
      <h1>{activity.title}</h1>
      <h2>
        {activity.location} - max capacity : {activity.capacity} pers.
      </h2>
      <p>{activity.price}€ per persons.</p>
      <p>{activity.description}</p>
      {/* <p>Dates available : {activity.datesAvailable}</p> */}
      {/* <p>
        Start : {activity.startTime} - End : {activity.endTime}
      </p> */}

      <h3>Hosted by : {activity.host?.userName}</h3>
      {update()}

      <h1>MAP</h1>
      <button>Book now</button>
    </div>
  );
}
