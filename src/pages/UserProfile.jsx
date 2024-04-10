import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import placeholderImage from "../assets/profilepic.png";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function UserProfile() {
  const { user: loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`${API_URL}/user/${userId}`)
        .then((response) => {
          const oneUser = response.data;
          // console.log(oneUser);
          setUser(oneUser);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    getUser();
    console.log(loggedUser);
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  // console.log("this is the user", user);

  console.log(user.activities);
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
              <p>
                {user.languages.map((language, index) => {
                  if (index === user.languages.length - 1) {
                    return language + " ";
                  } else {
                    return language + ", ";
                  }
                })}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Lodgings by this user:</strong> {user.lodgings?.title}
                {/* do everything i did for activities for the lodging */}
              </p>
              <p>
                <strong>Activities by this user:</strong>{" "}
                <div>
                  {user.activities?.map((activity) => (
                    <Link to={`/activity-list/${activity._id}`}>
                      <div key={activity._id}>
                        <p>{activity.title}</p>
                        <p>{activity.thumbnail}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </p>
            </div>
            <div>
              {/* compare user id of profile with user that's logged in */}
              {loggedUser._id == userId && (
                <Link to={`/user/${user._id}/edit`}>
                  <button>Edit</button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
