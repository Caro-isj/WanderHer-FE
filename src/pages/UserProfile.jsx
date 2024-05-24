{
  /* arreglar:       
               
                  1- homepage centrar sin usar margintop
                2- simplificar codigo de editprofile 
                3-hacer responsive*/
}

{
  /* OLD DESIGN */
}

{
  /* <div className="all-services">
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
          </div> */
}

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import placeholderImage from "../assets/profilepic.png";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/ProfileStyle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

          <div className="container">
            {userLodgings.length > 0 && <h2>{user.userName}'s Lodgings: </h2>}
            <div className="swiper-container">
              <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                loop={userLodgings.length > 1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={{
                  clickable: true,
                }}
                slidesPerView={1}
              >
                {userLodgings.map((lodging) => (
                  <SwiperSlide key={lodging._id}>
                    <Link to={`/lodging/${lodging._id}`}>
                      <div className="card">
                        <img src={lodging.images} alt="" />
                        <h4>{lodging.title}</h4>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="pagination"></div>
            <div className="navigation"></div>
          </div>

          <div className="container">
            {user.activities.length > 0 && (
              <h2>{user.userName}'s Activities:</h2>
            )}
            <div className="swiper-container">
              <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                loop={user.activities.length > 1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={{ clickable: true }}
                slidesPerView={1}
              >
                {user.activities.map((activity) => (
                  <SwiperSlide key={activity._id}>
                    <Link to={`/activity-list/${activity._id}`}>
                      <div className="card">
                        <img src={activity.thumbnail} alt="" />
                        <h4>{activity.title}</h4>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="pagination"></div>
            <div className="navigation"></div>
          </div>

          <div className="edit-profile">
            {/* compare user id of profile with user that's logged in */}
            {loggedUser._id == userId && (
              <Link to={`/user/${user._id}/edit`}>
                <button>Edit Profile</button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
