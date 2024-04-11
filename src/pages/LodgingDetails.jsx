import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/LodgingDetailsStyle.css";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function LodgingDetails() {
  const [lodgingDetails, setLodgingDetails] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [lodgingCoordinates, setLodgingCoordinates] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(AuthContext);

  const { lodgingId } = useParams();
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/lodging/${lodgingId}`)
      .then((response) => {
        setLodgingDetails(response.data);
        console.log(response.data);
        setLodgingCoordinates({
          lat: response.data.latitude,
          lng: response.data.longitude,
        });
        setIsMapLoaded(true);
      })
      .catch((error) =>
        console.error("Error fetching lodging details:", error)
      );

    axios
      .get(`${API_URL}/review/${lodgingId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) =>
        console.error("Error fetching lodging reviews:", error)
      );
  }, [lodgingId]);

  if (!lodgingDetails) {
    return <p>Loading...</p>;
  }
  function handleDelete() {
    axios
      .delete(`${API_URL}/lodging/${lodgingId}`)
      .then(() => navigate(`/lodging-list`));
  }

  function showCreateReview() {
    setShowAddReview(!showAddReview);
  }

  function addReview(e) {
    e.preventDefault();
    const review = {
      user: user._id,
      property: lodgingId,
      title,
      comment,
      rating,
    };
    axios
      .post(`${API_URL}/review/`, review)
      .then((response) => {
        console.log(response);
        navigate(0);
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
  
  return (
    <div className="lodging-details-container">
      <h1 className="lodging-details-title">{lodgingDetails.title}</h1>
      <div className="lodging-details-imgcontainer">
        <img
          src={lodgingDetails.images}
          alt={lodgingDetails.title}
          style={{ width: "50%", height: "auto" }}
        />
      </div>
      <div className="lodging-details-details">
        <h1>{lodgingDetails.location}</h1>
        <h2>{lodgingDetails.description}</h2>
        <p>{lodgingDetails.type}</p>
        <p>Max Guests: {lodgingDetails.maxGuests}</p>
        <p>Max Stay: {lodgingDetails.maxStay}</p>
        <p>{lodgingDetails.amenities.join(", ")}</p>
        {lodgingDetails.observations && (
          <p>Observations: {lodgingDetails.observations}</p>
        )}
      </div>
      <div className="map-container">
        {isLoaded && lodgingCoordinates && (
          <>
            <GoogleMap
              mapContainerClassName="maps-embeded"
              center={lodgingCoordinates}
              zoom={15}
            >
              <Marker
                position={lodgingCoordinates}
                onClick={() => setSelectedMarker(lodgingCoordinates)}
              />
            </GoogleMap>
          </>
        )}
      </div>
      {user._id == lodgingDetails.host && (
        <>
          <Link to={`/edit-lodging/${lodgingId}`}>
            <button>Edit Lodging</button>
          </Link>
          <button onClick={handleDelete}>Delete Lodging</button>
        </>
      )}
      <div className="lodging-details-addreviews">
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
                type="number"
                min="1"
                max="5"
                value={rating}
                placeholder="your rating out of 5"
                onChange={(e) => {
                  setRating(e.target.value);
                }}
              />
            </label>
            <button>Submit</button>
          </form>
        )}
      </div>
      <Link to={`/user/${lodgingDetails.host}`}>
        <button>See Host!</button>
      </Link>

      <div>
        {reviews.map((rev) => (
          <div key={rev._id} className="lodging-details-reviews">
            <p>{rev.comment}</p>
            <h2>{rev.title}</h2>
            <p>{getRating(rev.rating)}</p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LodgingDetails;
