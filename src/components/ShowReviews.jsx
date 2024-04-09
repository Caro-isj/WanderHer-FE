import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ShowReviews() {
  const [reviews, setReviews] = useState([]);

 const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  useEffect(() => {
    axios
      .get(`${API_URL}/review`)
      .then((response) => {
        setReviews(response.data); 
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>User: {review.user ? review.user.username : "Anonymous"}</p>
              <p>Comment: {review.comment}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
}
