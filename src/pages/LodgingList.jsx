import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LodgingList() {
  const [lodging, setLodging] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterAmenities, setFilterAmenities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/lodging")
      .then((response) => {
        setLodging(response.data);
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
      <div>
        <h1>Lodging List</h1>
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
        {/* still havent implemented the logic to fetch the amenities in each lodging*/}
        <label>
          <input
            type="checkbox"
            value="wifi"
            onChange={handleAmenitiesChange}
            checked={filterAmenities.includes("wifi")}
          />
          WiFi
        </label>
      </div>
      <div>
        {filteredLodgings.length > 0 ? (
          filteredLodgings.map((lodging) => (
            <div key={lodging.id}></div>
          ))
        ) : (
          <p>No lodgings found.</p>
        )}
      </div>
      <div>
        {lodging.length > 0 ? (
          lodging.map((lodging) => (
            <div key={lodging.id}>
              <img
                src={lodging.images}
                alt={lodging.title}
                style={{ width: "100%", height: "auto" }}
              />
              <h2>{lodging.title}</h2>
              <p>{lodging.description}</p>
              <p>{lodging.location}</p>
            </div>
          ))
        ) : (
          <p>No lodgings found.</p>
        )}
      </div>
    </div>
  );
}
