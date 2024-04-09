import React, { useEffect, useState } from "react";
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function LodgingDetails() {
  const [lodgingDetails, setLodgingDetails] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [lodgingCoordinates, setLodgingCoordinates] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
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
  }, [lodgingId]);

  if (!lodgingDetails) {
    return <p>Loading...</p>;
  }
  function handleDelete() {
    axios
      .delete(`${API_URL}/lodging/${lodgingId}`)
      .then(() => navigate(`/lodging-list`));
  }
  return (
    <div>
      <h1>{lodgingDetails.title}</h1>
      <img
        src={lodgingDetails.images}
        alt={lodgingDetails.title}
        style={{ width: "100%", height: "auto" }}
      />
      <p>{lodgingDetails.description}</p>
      <p>Location: {lodgingDetails.location}</p>
      <p>Type: {lodgingDetails.type}</p>
      <p>Max Guests: {lodgingDetails.maxGuests}</p>
      <p>Max Stay: {lodgingDetails.maxStay}</p>
      <p>Amenities: {lodgingDetails.amenities.join(", ")}</p>
      {lodgingDetails.observations && (
        <p>Observations: {lodgingDetails.observations}</p>
      )}
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
      <Link to={`/edit-lodging/${lodgingId}`}>
        <button>Edit Lodging</button>
      </Link>
      <button onClick={handleDelete}>Delete Lodging</button>
    </div>
  );
}

export default LodgingDetails;
