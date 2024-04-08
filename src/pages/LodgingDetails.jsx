import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/LodgingDetailsStyle.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function LodgingDetails() {
  const [lodgingDetails, setLodgingDetails] = useState(null);
  const { lodgingId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/lodging/${lodgingId}`)
      .then((response) => {
        setLodgingDetails(response.data);
      })
      .catch((error) =>
        console.error("Error fetching lodging details:", error)
      );
  }, [lodgingId]);

  if (!lodgingDetails) {
    return <p>Loading...</p>;
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
      <Link to={`/edit-lodging/${lodgingId}`}>
        <button>Edit Lodging</button>
      </Link>
    </div>
  );
}

export default LodgingDetails;
