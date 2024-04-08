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
    console.log(lodgingId)
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
        navigate(`/lodging/${lodgingId}`); // Redirect to the lodging list or detail page after update
      })
      .catch((error) => console.error("Error updating lodging:", error));
  };

  // Render form (similar to CreateLodging) with lodgingData populated
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={lodgingData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={lodgingData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={lodgingData.location}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Type:
        <select
          name="type"
          value={lodgingData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Couch">Couch</option>
          <option value="Full Bedroom">Full Bedroom</option>
          <option value="Bed in Shared Bedroom">Bed in Shared Bedroom</option>
        </select>
      </label>
      <fieldset>
        <legend>Amenities:</legend>
        {[
          "wifi",
          "private bathroom",
          "garden",
          "pet-friendly",
          "air conditioner",
          "kitchen",
          "heating",
        ].map((amenity) => (
          <label key={amenity}>
            <input
              type="checkbox"
              value={amenity}
              checked={lodgingData.amenities.includes(amenity)}
              onChange={handleCheckboxChange}
            />
            {amenity}
          </label>
        ))}
      </fieldset>
      <label>
        Max Guests:
        <input
          type="number"
          name="maxGuests"
          value={lodgingData.maxGuests}
          onChange={handleChange}
          required
          min="1"
        />
      </label>
      <label>
        Max Stay:
        <input
          type="number"
          name="maxStay"
          value={lodgingData.maxStay}
          onChange={handleChange}
          required
          min="1"
        />
      </label>
      <label>
        Observations:
        <textarea
          name="observations"
          value={lodgingData.observations}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Finish Edit</button>
    </form>
  );
}

export default EditLodging;
