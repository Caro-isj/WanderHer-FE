import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import placeholderImage from "../assets/profilepic.png";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/ProfileStyle.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function UserProfile() {
  const { user: loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLodgings, setUserLodgings] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/user/${userId}`)
      .then((response) => {
        const oneUser = response.data;
        setUser(oneUser);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${API_URL}/lodging/host/${userId}`)
      .then((response) => {
        setUserLodgings(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      {user && (
        <>
          <div className="profile-info-cont">
            <div>
              <img
                src={user.profilePicture || placeholderImage}
                alt="profilePicture"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = placeholderImage;
                }}
              />
            </div>
            <div className="user-info">
              <h1> {user.userName}</h1>
              <p>
                <strong>
                  {user.firstName} {user.lastName}
                </strong>{" "}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>City: </strong>
                {user.location}
              </p>
              <p>
                <strong>Age: </strong> {user.age}
              </p>
              <p>
                {" "}
                <strong>Occupation: </strong>
                {user.occupation}
              </p>
              <p>
                {" "}
                <strong>Languages: </strong>
                {user.languages.map((language, index) => {
                  if (index === user.languages.length - 1) {
                    return language + " ";
                  } else {
                    return language + ", ";
                  }
                })}
              </p>
              <p>
                <strong>About me: </strong>
                {user.aboutMe}
              </p>
            </div>
          </div>
          <div>
            <div className="service-wrap">
              <h3>
                {userLodgings.length > 0 && (
                  <strong>Lodgings by this user:</strong>
                )}
                {userLodgings.map((lodging) => (
                  <Link key={lodging._id} to={`/lodging/${lodging._id}`}>
                    <div className="srv-info">
                      <img src={lodging.images} alt="" />
                      <h4>{lodging.title}</h4>
                    </div>
                  </Link>
                ))}
              </h3>
            </div>
            <div className="service-wrap">
              <h3>
                {user.activities.length > 0 && (
                  <strong>Activities by this user:</strong>
                )}

                {user.activities.map((activity) => (
                  <Link
                    key={activity._id}
                    to={`/activity-list/${activity._id}`}
                  >
                    <div className="srv-info">
                      <img src={activity.thumbnail} alt="" />
                      <h4>{activity.title}</h4>
                    </div>
                  </Link>
                ))}
              </h3>
            </div>
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
  );
}

export default UserProfile;
