import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const EditActivity = () => {
  const { activityId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [date, setDate] = useState(Date.now);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  // const [host, setHost] = useState(userId);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const theToken = localStorage.getItem("authToken");
  const nav = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
  // console.log(`${API_URL}/activity/${activityId}`);
  useEffect(() => {
    axios
      .get(`${API_URL}/activity/${activityId}`, {
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      })
      .then((response) => {
        const activityData = response.data;
        setTitle(activityData.title);
        setDescription(activityData.description);
        setLocation(activityData.location);
        setMeetingPoint(activityData.meetingPoint);
        setCapacity(activityData.capacity);
        setDate(activityData.date);
        setPrice(activityData.price);
        setImages(activityData.images);
        setThumbnail(activityData.thumbnail);
        setLatitude(activityData.latitude);
        setLongitude(activityData.longitude);
      })
      .catch((err) => {
        console.log("Error fetching activity", err);
      });
  }, [activityId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const activityToUpdate = {
      title,
      description,
      location,
      meetingPoint,
      capacity,
      date,
      price,
      images,
      thumbnail,
      latitude,
      longitude,
    };

    axios
      .put(`${API_URL}/activity/${activityId}`, activityToUpdate, {
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      })
      .then((updateAct) => {
        console.log("you created an activity", updateAct.data);
        nav(`/activity-list/${activityId}`);
      })
      .catch((err) => {
        console.log(
          "there was an error creating activity",
          err.response.data.message
        );
        setError(err.response.data.message);
      });

    // Clear the form
    setTitle("");
    setDescription("");
    setLocation("");
    setMeetingPoint("");
    setCapacity("");
    setDate("");
    setPrice("");
    setImages("");
    setThumbnail("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <div className="activity-form">
      <h1>Add activity</h1>
      <form onSubmit={handleSubmit}>
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
          Description :
          <textarea
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <label>
          Location :
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </label>
        <label>
          Meeting point :
          <input
            type="text"
            value={meetingPoint}
            onChange={(e) => {
              setMeetingPoint(e.target.value);
            }}
          />
        </label>
        <label>
          People capacity :
          <input
            type="number"
            value={capacity}
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
          />
        </label>
        <label>
          Price per person :
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </label>
        <label>
          Thumbnail image :
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => {
              setThumbnail(e.target.value);
            }}
          />
        </label>
        <label>
          Images :
          <input
            type="text"
            value={images}
            onChange={(e) => {
              setImages(e.target.value);
            }}
          />
        </label>
        <label>
          Latitude:
          <input
            type="number"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            step="0.00000001"
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            step="0.00000001"
          />
        </label>
        <p>
          <a
            href="https://www.latlong.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discover your house's precise coordinates with ease! Simply click
            here 📍
          </a>
          .
        </p>
        <button>Submit</button>
      </form>
    </div>
  );
};
