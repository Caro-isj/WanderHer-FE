import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function ActivitiesDetails() {
  const [activity, setActivity] = useState("");
  const { activityId } = useParams();
  const { user } = useContext(AuthContext);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activityCoordinates, setActivityCoordinates] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API,
  });

  const nav = useNavigate();

  useEffect(() => {
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
    axios
      .get(`${API_URL}/review/${activityId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) =>
        console.error("Error fetching lodging reviews:", error)
      );
    getOneAct();
  }, [activityId]);

  if (!activity) {
    return <p>Loading</p>;
  }

  const handleDelete = () => {
    if (confirm("Are you sure ?")) {
      axios
        .delete(`${API_URL}/activity/${activityId}`)
        .then((response) => {
          axios.get(`${API_URL}/activity`).then((response) => {
            setActivity(response.data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      nav("/activity-list");
    }
  };

  //show the update and delete buttons only if you're the host of the activity.
  const update = () => {
    if (activity.host?._id === user?._id) {
      return (
        <>
          <Link to={`/activity-list/${activityId}/edit`}>
            <button>Update activity</button>
          </Link>
          <button onClick={handleDelete}>Delete activity</button>
        </>
      );
    } else {
      console.log("Didn't work");
      return null;
    }
  };

  //show the book now button only if you're not the host of the activity.
  const bookNow = () => {
    if (!activity.host?._id === user._id) {
      return (
        <>
          <button>Book now</button>
          <Link to={`/user/${activity.host}`}>
            <button>See Host!</button>
          </Link>
        </>
      );
    } else {
      console.log("you're the host of this activity");
      return null;
    }
  };

  function showCreateReview() {
    setShowAddReview(!showAddReview);
  }

  function addReview(e) {
    e.preventDefault();
    const review = {
      user: user._id,
      property: activityId,
      title,
      comment,
      rating,
    };
    axios
      .post(`${API_URL}/review/`, review)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error posting reviews:", error));
  }

  const getRating = (rating) => {
    const fullStar = Math.round(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStar) {
        stars.push("⭐");
      } else {
        stars.push("☆");
      }
    }
    return stars.join("");
  };

  const reviewsWithRatings = reviews.map((rev) => ({
    ...rev,
    stars: getRating(rev.rating),
  }));
  const renderedReviews = reviewsWithRatings.map((rev) => (
    <>
      <h2>{rev.title}</h2>
      <p>{rev.comment}</p>
      <p>{rev.stars}</p>
    </>
  ));

  return (
    <div className="activity-details">
      <img src={activity.images} alt={activity.title} />
      <h1>{activity.title}</h1>
      <h2>
        {activity.location} - max capacity : {activity.capacity} pers.
      </h2>

      <p>{activity.price}€ per persons.</p>
      <p>{activity.description}</p>
      {/* <p>
        Start : {activity.startTime} - End : {activity.endTime}
      </p> */}

      <h3>Hosted by : {activity.host?.userName}</h3>

      <h4>Meet here : {activity.meetingPoint}</h4>
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
      {update()}
      {bookNow()}
      <button onClick={showCreateReview}>Add Review</button>
      {showAddReview && (
        <form onSubmit={addReview}>
          <label>
            Title :
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label>
            Review :
            <input
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </label>
          <label>
            Rating :
            <input
              type="text"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </label>
          <button>Submit</button>
        </form>
      )}

      <div>{renderedReviews}</div>
    </div>
  );
}
