import axios from "axios";
import React, { useEffect, useState } from "react";
import BusinessOwned from "../components/BusinessOwned";
import { Link } from "react-router-dom";
import "../styles/DashboardStyles.css";
import logo from "../assets/logotest1.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function Dashboard() {
  const [lodgings, setLodgings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/lodging`)
      .then((response) => {
        setLodgings(response.data);
      })
      .catch((error) => {
        console.log("Couldn't get the lodgings you were expecting", error);
      });

    axios
      .get(`${API_URL}/activity`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log("Error fetching all activities", error);
      });
  }, []);

  useEffect(() => {
    const lodgingLocations = lodgings.map((lodging) => lodging.location);
    const activityLocations = activities.map((activity) => activity.location);
    const combinedLocations = [
      ...new Set([...lodgingLocations, ...activityLocations]),
    ];
    setLocations(combinedLocations);
  }, [lodgings, activities]);

  const getRandomItems = (arr, location) => {
    if (location) {
      arr = arr.filter((item) => item.location === location);
    }
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="dashboard">
      <div className="dash-intro">
        <img src={logo} />
        <h3>WanderHer</h3>
        <h6>
          Be part of our global fellowship of female travelers and find your
          next homestay.
        </h6>
      </div>
      <div className="list-choice">
        <select onChange={handleLocationChange}>
          <option className="list-choice-title" value="">
            I'm feeling lucky in...
          </option>
          {locations.map((location, index) => (
            <option
              className="list-choice-objects"
              key={index}
              value={location}
            >
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="both-services">
        <div className="services-container">
          {getRandomItems(lodgings, selectedLocation).length > 0 && (
            <h2>Our Lodgings</h2>
          )}
          {getRandomItems(lodgings, selectedLocation).map((lodging, index) => (
            <Link key={lodging._id} to={`/lodging/${lodging._id}`}>
              <div className="services">
                <img src={lodging.images} alt={lodging.title} />
                <p>{lodging.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="services-container">
          {getRandomItems(activities, selectedLocation).length > 0 && (
            <h2>Our Activities</h2>
          )}
          {getRandomItems(activities, selectedLocation).map(
            (activity, index) => (
              <Link key={activity._id} to={`/activity-list/${activity._id}`}>
                <div className="services">
                  <img src={activity.thumbnail} alt={activity.title} />
                  <p>{activity.title}</p>
                </div>
              </Link>
            )
          )}
        </div>
      </div>

      <BusinessOwned />
    </div>
  );
}
