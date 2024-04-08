import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ActivitiesDetails({ activities, setActivities }) {
  const [activity, setActivity] = useState(activities);
  const { activityId } = useParams();
  const { userId } = useParams();
  const [user, setUser] = useState({ userId });

  useEffect(() => {
    const getOneAct = async () => {
      try {
        const thisAct = await axios.get(
          `http://localhost:5005/activity/${activityId}`
        );
        setActivity(thisAct.data);
        console.log(thisAct.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOneAct();
  }, [activityId]);

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

      <h3>Hosted by : {activity.host.username}</h3>
      {}
      <h1>MAP</h1>
      <button>Book now</button>
    </div>
  );
}
