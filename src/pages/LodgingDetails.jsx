import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function LodgingDetails() {
  const [lodgingDetails, setLodgingDetails] = useState(null);
  const { lodgingId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/lodging/${lodgingId}`)
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
    </div>
  );
}

export default LodgingDetails;
