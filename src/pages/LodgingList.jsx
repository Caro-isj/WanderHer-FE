import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LodgingList() {
  const [lodging, setLodging] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/lodgings")
      .then((response) => {
        setLodging(response.data);
      })
      .catch((error) => {
        console.log("Couldn't get the lodgings you were expecting", error);
      });
  }, []);
  return (
    <div>
      <h1>Lodging List</h1>
      <div>
        {lodgings.length > 0 ? (
          lodgings.map((lodging) => (
            <div key={lodging.id}>
              <img
                src={lodging.imageUrl}
                alt={lodging.name}
                style={{ width: "100%", height: "auto" }}
              />
              <h2>{lodging.name}</h2>
              <p>{lodging.description}</p>
            </div>
          ))
        ) : (
          <p>No lodgings found.</p>
        )}
      </div>
    </div>
  );
}
