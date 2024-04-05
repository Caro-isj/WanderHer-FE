import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditLodging() {
  const [lodgingData, setLodgingData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    amenities: [],
    maxGuests: "",
    maxStay: "",
    images: [],
    observations: "",
  });
  const { lodgingId } = useParams(); // Assuming you're using React Router and have a route like "/edit-lodging/:lodgingId"
  const navigate = useNavigate();

  useEffect(() => {
    if (lodgingId) {
      axios
        .get(`http://localhost:5005/lodging/${lodgingId}`)
        .then((response) => {
          setLodgingData(response.data);
        })
        .catch((error) => console.error("Error fetching lodging data:", error));
    }
  }, [lodgingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLodgingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedAmenities = checked
      ? [...lodgingData.amenities, value]
      : lodgingData.amenities.filter((amenity) => amenity !== value);
    setLodgingData((prevState) => ({
      ...prevState,
      amenities: updatedAmenities,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5005/lodging/${lodgingId}`, lodgingData)
      .then((response) => {
        console.log("Lodging updated:", response.data);
        navigate("/"); // Redirect to the lodging list or detail page after update
      })
      .catch((error) => console.error("Error updating lodging:", error));
  };

  // Render form (similar to CreateLodging) with lodgingData populated
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields (identical to CreateLodging but with lodgingData values) */}
      <button type="submit">Update Lodging</button>
    </form>
  );
}

export default EditLodging;
