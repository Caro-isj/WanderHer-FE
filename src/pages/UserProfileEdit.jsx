import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
// const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_STUDENT_FORM_VALUES = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profilePicture: "",
};

function UserProfileEdit() {
  const [user, setUser] = useState({ ...DEFAULT_STUDENT_FORM_VALUES });
  const [loading, setLoading] = useState(true);
  //   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  //   const { userId } = useParams();

  const navigate = useNavigate();

  //  PROFILE PICTURE - creating form data and add properties to it

  // const formData = new FormData();
  // const image = event.target.image.files[0];
  // formData.append("profilePicture", image);
  // formData.append("userName", userName);
  // formData.append("email", email);
  // formData.append("password", password);

  const handleSubmit = () => {
    const requestBody = { ...user };

    setLoading(true);

    axios
      .put(`http://localhost:5005/user/`, requestBody)
      .then(() => {
        navigate(`/students/details/${user.id}`);
      })
      .catch((error) => console.log(error));
  };

  //   const handleDelete = () => {
  //     axios
  //       .delete(`http://localhost:5005/user/${user.id}`)
  //       .then(() => {
  //         navigate("/");
  //       })
  //       .catch((error) => console.log(error));
  //   };

  const handleChange = (e) => {
    const { name, value, type, checked, options, multiple } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    if (multiple && options) {
      inputValue = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          inputValue.push(options[i].value);
        }
      }
    }

    setUser((prevUser) => ({
      ...prevUser,
      [name]: inputValue,
    }));
  };

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`http://localhost:5005/`)
        .then((response) => {
          const userData = response.data;
          setStudent(userData);
        })
        .catch((error) => console.log(error));
    };

    getUser();
    setLoading(false);
  }, [userId]);

  return (
    <div>
      <h3>Edit User</h3>

      {/* {showDeleteConfirmation && (
        <div >
          <div ></div>

          <div >
            <p >
              Are you sure you want to delete this student?
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
      )} */}

      <form onSubmit={handleSubmit}>
        <label>User Name::</label>
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
        <input
          type="file"
          name="profilePicture"
          value={user.profilePicture}
          onChange={handleChange}
        />

        {/* <label>Profile Picture:
        <input type="file" name="image" /> 
        </label> */}

        <button disabled={loading} type="submit" onClick={() => handleSubmit()}>
          Save
        </button>
        <button disabled={loading} type="button" onClick={() => handleDelete()}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default UserProfileEdit;
