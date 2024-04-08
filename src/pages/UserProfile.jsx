// import React from "react";

// export default function UserProfile() {
//   return <div>UserProfile</div>;
// }

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import placeholderImage from "../assets/profilepic.png";

// Import the string from the .env with URL of the API/server - http://localhost:5005
// const API_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`http://localhost:5005/user/${userId}`)
        .then((response) => {
          const oneUser = response.data;
          console.log(oneUser);
          setUser(oneUser);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    getUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {user && (
          <>
            <img
              src={user.profilePicture || placeholderImage}
              alt="profilePicture"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = placeholderImage;
              }}
            />
            <h1> {user.userName}</h1>

            <div>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phoneNumber}
              </p>
            </div>
            <div>
              <Link to={`/user/${user._id}/edit`}>
                <button>Edit</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
