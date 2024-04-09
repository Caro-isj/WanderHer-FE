import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function ActivitiesDetails() {
  const [activity, setActivity] = useState("");
  const { activityId } = useParams();
  const { userId } = useParams();
  // const [user, setUser] = useState({ userId });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activityCoordinates, setActivityCoordinates] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API,
  });

  const nav = useNavigate();

  useEffect(() => {
    console.log("test");
    const getOneAct = async () => {
      try {
        const thisAct = await axios.get(`${API_URL}/activity/${activityId}`);
        setActivity(thisAct.data);
        console.log(thisAct.data);
        setActivityCoordinates({
          lat: thisAct.data.latitude,
          lng: thisAct.data.longitude,
        });
        setIsMapLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    getOneAct();
  }, [activityId]);

  if (!activity) {
    <p>Loading</p>;
  }

  // const update = () => {
  //   if (activity.host?._id === userId) {
  //     return (
  //       <button onClick={nav("/activity-list/:activityId/edit")}>
  //         Update activity
  //       </button>
  //     );
  //   }
  // };

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
      {/* {update()} */}

      <div className="map-container">
        {isLoaded && activityCoordinates && (
          <>
            <GoogleMap
              mapContainerClassName="maps-embeded"
              center={activityCoordinates}
              zoom={15}
            >
              <Marker
                position={activityCoordinates}
                onClick={() => setSelectedMarker(activityCoordinates)}
              />
            </GoogleMap>
          </>
        )}
      </div>
      <Link to={`/activity-list/${activityId}/edit`}>
        <button>Update activity</button>
      </Link>
      <button>Book now</button>
    </div>
  );
}
