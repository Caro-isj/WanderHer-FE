// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// // Import the string from the .env with URL of the API/server - http://localhost:5005
// // const API_URL = import.meta.env.VITE_API_URL;

// const DEFAULT_USER_FORM_VALUES = {
//   userName: "",
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneNumber: 0,
//   profilePicture: "",
// };

// function UserProfileEdit() {
//   const [user, setUser] = useState({ ...DEFAULT_USER_FORM_VALUES });
//   const [loading, setLoading] = useState(true);
//   //   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const { userId } = useParams();

//   const navigate = useNavigate();

//   //  PROFILE PICTURE - creating form data and add properties to it

//   // const formData = new FormData();
//   // const image = event.target.image.files[0];
//   // formData.append("profilePicture", image);
//   // formData.append("userName", userName);
//   // formData.append("email", email);
//   // formData.append("password", password);

//   const handleSubmit = () => {
//     const requestBody = { ...user };

//     setLoading(true);

//     axios
//       .put(`${API_URL}/user/`, requestBody)
//       .then(() => {
//         navigate(`/user/${userId}`);
//       })
//       .catch((error) => console.log(error));
//   };

//   //   const handleDelete = () => {
//   //     axios
//   //       .delete(`${API_URL}/user/${user.id}`)
//   //       .then(() => {
//   //         navigate("/");
//   //       })
//   //       .catch((error) => console.log(error));
//   //   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, options, multiple } = e.target;

//     let inputValue = type === "checkbox" ? checked : value;

//     if (multiple && options) {
//       inputValue = [];
//       for (let i = 0, l = options.length; i < l; i++) {
//         if (options[i].selected) {
//           inputValue.push(options[i].value);
//         }
//       }
//     }

//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: inputValue,
//     }));
//   };

//   useEffect(() => {
//     const getUser = () => {
//       axios
//         .get(`${API_URL}/user/${userId}`)
//         .then((response) => {
//           const userData = response.data;
//           console.log(userData);
//           setUser(userData);
//         })
//         .catch((error) => console.log(error));
//     };

//     getUser();
//     setLoading(false);
//   }, [userId]);

//   return (
//     <div>
//       <h3>Edit User</h3>

//       {/* {showDeleteConfirmation && (
//         <div >
//           <div ></div>

//           <div >
//             <p >
//               Are you sure you want to delete this student?
//             </p>

//             <div >
//               <button
//                 onClick={handleDelete}

//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setShowDeleteConfirmation(false)}

//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )} */}

//       <form onSubmit={handleSubmit}>
//         <label>User Name:</label>
//         <input
//           type="text"
//           name="userName"
//           value={user.userName}
//           onChange={handleChange}
//         />

//         <label>First Name:</label>
//         <input
//           type="text"
//           name="firstName"
//           value={user.firstName}
//           onChange={handleChange}
//         />

//         <label>Last Name:</label>
//         <input
//           type="text"
//           name="lastName"
//           value={user.lastName}
//           onChange={handleChange}
//         />

//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={user.email}
//           onChange={handleChange}
//           className="border rounded p-2 w-full mb-6"
//         />

//         <label>Phone:</label>
//         <input
//           type="tel"
//           name="phoneNumber"
//           value={user.phoneNumber}
//           onChange={handleChange}
//           className="border rounded p-2 w-full mb-6"
//         />

//         <label>Profile Picture:</label>
//         <input
//           type="file"
//           name="profilePicture"
//           value={user.profilePicture}
//           onChange={handleChange}
//         />

//         <button disabled={loading} type="submit" onClick={() => handleSubmit()}>
//           Save
//         </button>
//         <button disabled={loading} type="button" onClick={() => handleDelete()}>
//           Delete
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UserProfileEdit;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

const DEFAULT_USER_FORM_VALUES = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: 0,
  profilePicture: "",
  aboutMe: "",
  location: "",
  age: 0,
  occupation: "",
  languages: [],
};

function UserProfileEdit() {
  const [user, setUser] = useState({ ...DEFAULT_USER_FORM_VALUES });
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); //DELETE
  const { userId } = useParams();
  const navigate = useNavigate();

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
    formData.append("profilePicture", image);
    formData.append("aboutMe", user.aboutMe);
    formData.append("location", user.location);
    formData.append("age", user.age);
    formData.append("occupation", user.occupation);
    formData.append("languages", user.languages);

    setLoading(true);

    axios
      .put(`${API_URL}/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate(`/user/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    //DELETE
    axios
      .delete(`${API_URL}/user/${user.id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    setUser((prevUser) => {
      if (checked) {
        return {
          ...prevUser,
          // languages: [],
          languages: [...prevUser.languages, value],
        };
      } else {
        return {
          ...prevUser,
          languages: prevUser.languages.filter((lang) => lang !== value),
        };
      }
    });
  };

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`${API_URL}/user/${userId}`)
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };

    getUser();
  }, []);

  // console.log(user.languages);

  return (
    <div>
      <h3>Edit User</h3>

      {showDeleteConfirmation && ( //DELETE
        <div>
          <div></div>

          <div>
            <p>Are you sure you want to delete this student?</p>

            <div>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

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
        <label>About Me:</label>
        <input
          type="text"
          name="aboutMe"
          value={user.aboutMe}
          onChange={handleChange}
        />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={user.location}
          onChange={handleChange}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
        />
        <label>Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={user.occupation}
          onChange={handleChange}
        />
        {/* <label>Languages:</label>
        <select name="languages" value={user.languages} onChange={handleChange}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Dutch">Dutch</option>
          <option value="Other">Other</option>
        </select> */}

        <label>Languages:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="English"
              checked={user.languages.includes("English")}
              onChange={handleLanguageChange}
            />
            English
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Spanish"
              checked={user.languages.includes("Spanish")}
              onChange={handleLanguageChange}
            />
            Spanish
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="French"
              checked={user.languages.includes("French")}
              onChange={handleLanguageChange}
            />
            French
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="German"
              checked={user.languages.includes("German")}
              onChange={handleLanguageChange}
            />
            German
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Italian"
              checked={user.languages.includes("Italian")}
              onChange={handleLanguageChange}
            />
            Italian
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Portuguese"
              checked={user.languages.includes("Portuguese")}
              onChange={handleLanguageChange}
            />
            Portuguese
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Turkish"
              checked={user.languages.includes("Turkish")}
              onChange={handleLanguageChange}
            />
            Turkish
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Arabic"
              checked={user.languages.includes("Arabic")}
              onChange={handleLanguageChange}
            />
            Arabic
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Farsi"
              checked={user.languages.includes("Farsi")}
              onChange={handleLanguageChange}
            />
            Farsi
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Hebrew"
              checked={user.languages.includes("Hebrew")}
              onChange={handleLanguageChange}
            />
            Hebrew
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Russian"
              checked={user.languages.includes("Russian")}
              onChange={handleLanguageChange}
            />
            Russian
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Polish"
              checked={user.languages.includes("Polish")}
              onChange={handleLanguageChange}
            />
            Polish
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Yoruba"
              checked={user.languages.includes("Yoruba")}
              onChange={handleLanguageChange}
            />
            Yoruba
          </label>
        </div>

        <button disabled={loading} type="submit">
          Save
        </button>
        {/* DELETE */}
        <button disabled={loading} type="button" onClick={() => handleDelete()}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default UserProfileEdit;
