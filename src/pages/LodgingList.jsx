import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LodgingListStyle.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function LodgingList() {
  const [lodging, setLodging] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterAmenities, setFilterAmenities] = useState([]);
  const [availableAmenities, setAvailableAmenities] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/lodging`)
      .then((response) => {
        setLodging(response.data);
        const amenitiesSet = new Set();
        response.data.forEach((lodging) => {
          lodging.amenities.forEach((amenity) => {
            amenitiesSet.add(amenity);
          });
        });
        setAvailableAmenities([...amenitiesSet]);
        console.log(response.data);
        console.log(lodging);
      })
      .catch((error) => {
        console.log("Couldn't get the lodgings you were expecting", error);
      });
  }, []);
  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    if (filterAmenities.includes(value)) {
      setFilterAmenities(
        filterAmenities.filter((amenity) => amenity !== value)
      );
    } else {
      setFilterAmenities([...filterAmenities, value]);
    }
  };

  const filteredLodgings = lodging.filter((lodging) => {
    return (
      (filterLocation ? lodging.location === filterLocation : true) &&
      (filterType ? lodging.type === filterType : true) &&
      filterAmenities.every((amenity) => lodging.amenities.includes(amenity)) &&
      (lodging.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lodging.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const uniquLocations = Array.from(
    new Set(lodging.map((item) => item.location))
  ).sort();
  return (
    <div>
      <h1>Lodging List</h1>
      <Link to="/create-lodging">
        <button className="button-add">Add Your Accomodation</button>
      </Link>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => setFilterLocation(e.target.value)}
          value={filterLocation}
        >
          <option value="">Select City</option>
          {uniquLocations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="">Select Type</option>
          <option value="couch">Couch</option>
          <option value="full bedroom">Full Bedroom</option>
          <option value="bed in shared bedroom">Bed in Shared Bedroom</option>
        </select>
        {availableAmenities.map((amenity) => (
          <label key={amenity}>
            <input
              type="checkbox"
              value={amenity}
              onChange={handleAmenitiesChange}
              checked={filterAmenities.includes(amenity)}
            />
            {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
          </label>
        ))}
      </div>
      <div className="lodging-list-container">
        {filteredLodgings.length > 0 ? (
          filteredLodgings.map((lodging) => <div key={lodging._id}></div>)
        ) : (
          <p>No lodgings found.</p>
        )}
      </div>
      <div>
        {filteredLodgings.length > 0 ? (
          filteredLodgings.map((lodging) => (
            <Link key={lodging._id} to={`/lodging/${lodging._id}`}>
              <div className="lodging-item">
                <img
                  src={lodging.images} // Make sure this is a valid URL
                  alt={lodging.title}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="lodging-details">
                  <h2>{lodging.title}</h2>
                  <p>{lodging.description}</p>
                  <p>{lodging.location}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No lodgings found.</p>
        )}
      </div>
    </div>
  );
}
