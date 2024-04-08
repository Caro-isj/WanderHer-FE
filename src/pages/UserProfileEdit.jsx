import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// // Import the string from the .env with URL of the API/server - http://localhost:5005
// // const API_URL = import.meta.env.VITE_API_URL;

const defaultUserFormValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: 0,
  profilePicture: "",
};

function UserProfileEdit() {
  const [user, setUser] = useState({ ...defaultUserFormValues });
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  //   //   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const image = e.target.profilePicture.files[0];

    formData.append("userName", user.userName);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("profilePicture", image);

    setLoading(true);

    axios
      .put(`http://localhost:5005/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate(`/user/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  //   //   const handleDelete = () => {
  //   //     axios
  //   //       .delete(`http://localhost:5005/user/${user.id}`)
  //   //       .then(() => {
  //   //         navigate("/");
  //   //       })
  //   //       .catch((error) => console.log(error));
  //   //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`http://localhost:5005/user/${userId}`)
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    getUser();
  }, [userId]);

  return (
    <div>
      <h3>Edit User</h3>

      {/* {showDeleteConfirmation && (
        <div >
          <div ></div>

          <div >
            <p >
              Are you sure you want to delete this user?
            </p>

            <div >
              <button
                onClick={handleDelete}

              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}

              >
                No
              </button>
            </div>
          </div>
        </div>
      )}  */}

      <form onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label>Profile Picture:</label>
        <input type="file" name="profilePicture" onChange={handleChange} />

        <button disabled={loading} type="submit">
          Save
        </button>
        {/* <button disabled={loading} type="button" onClick={() => handleDelete()}>
           Delete
        </button> */}
      </form>
    </div>
  );
}

export default UserProfileEdit;
