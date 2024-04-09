import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function CreateLodging() {
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
    latitude: null,
    longitude: null
  });

  const navigate = useNavigate();

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

    const myFormData = new FormData();
    const imageFile = e.target.image.files[0];
    if (imageFile) {
      // Only append if a file is selected
      myFormData.append("image", imageFile);
    }

    // Append other lodging data
    for (const key in lodgingData) {
      if (key !== "images") {
        // Exclude images as it's handled separately
        myFormData.append(key, lodgingData[key]);
      }
    }

    axios
      .post(`${API_URL}/lodging`, myFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Lodging created:", response.data);
        navigate("/lodging-list");
      })
      .catch((error) => {
        console.error("Error creating lodging:", error);
      });
  };


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
          "Wi-Fi",
          "Air Conditioning/Heating",
          "Essentials ",
          "Hot Water",
          "Kitchen",
          "Coffee Maker",
          "Microwave",
          "Refrigerator",
          "Hangers",
          "Hair Dryer",
          "Iron",
          "Extra Bedding",
          "Smoke Detector",
          "Carbon Monoxide Detector",
          "First Aid Kit",
          "Fire Extinguisher",
          "TV",
          "Washer/Dryer",
          "Dishwasher",
          "Private Entrance",
          "Balcony/Terrace",
          "BBQ Grill",
          "Garden or Backyard",
          "Outdoor Furniture",
          "Crib",
          "High Chair",
          "Baby Safety Gates",
          "Step-free access",
          "Wide doorways",
          "Accessible parking spot",
          "Pool",
          "Hot Tub",
          "Gym",
          "Private Parking",
          "Clothing Storage",
          "Mailbox Access",
          "Pet-Friendly Amenities",
          "Dedicated Workspace",
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
        Latitude:
        <input
          type="number"
          name="latitude"
          value={lodgingData.latitude}
          onChange={handleChange}
          step="0.00000001"
        />
      </label>
      <label>
        Longitude:
        <input
          type="number"
          name="longitude"
          value={lodgingData.longitude}
          onChange={handleChange}
          step="0.00000001"
        />
      </label>
      <p>
        <a
          href="https://www.latlong.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discover your house's precise coordinates with ease! Simply click here
          📍
        </a>
        .
      </p>
      <label>
        Observations:
        <textarea
          name="observations"
          value={lodgingData.observations}
          onChange={handleChange}
        />
      </label>
      <label>
        Profile Image:
        <input type="file" name="image" />
      </label>
      <button type="submit">Create Lodging</button>
    </form>
  );
}

export default CreateLodging;
