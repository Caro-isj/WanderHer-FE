// import React from "react";

// export default function UserProfile() {
//   return <div>UserProfile</div>;
// }

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import placeholderImage from "../assets/profilepic.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`${API_URL}/user/${userId}`)
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
                {user.age} {user.occupation}
              </p>
              <p>{user.location}</p>
              <p>{user.aboutMe}</p>
              <p>{user.languages}</p>
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
