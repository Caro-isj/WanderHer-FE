import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ActivityForm = () => {
  // const [activityData, setActivityData] = useState({
  //   title: "",
  //   description: "",
  //   location : "",
  //   meetingPoint: "",
  //   capacity: "",
  //   date: "",
  //   price: "",
  //   images: "",
  //   thumbnail: ""
  // })
  const { userId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [date, setDate] = useState(Date.now);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [host, setHost] = useState(userId);

  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const activityToCreate = {
      title,
      description,
      location,
      meetingPoint,
      capacity,
      date,
      price,
      images,
      thumbnail,
      host,
    };

    axios
      .post("http://localhost:5005/activity", activityToCreate)
      .then((createAct) => {
        console.log("you created an activity", createAct.data);
        nav("/activity-list");
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
    setHost("");
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
          <input
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ActivityForm;
