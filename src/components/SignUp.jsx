import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function SignUp() {
    const [userName, setUserName] = useState ("")
    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState ("")
    const [error, setError] = useState ("")

    const nav = useNavigate()

   const handleSignup = (event) => {
     event.preventDefault();
     const userToCreate = { userName, email, password };

     
     axios
       .post("http://localhost:5005/auth/signup", userToCreate)
       .then((response) => {
         console.log("you created a user", response.data);
         nav("/login");
       })
       .catch((err) => {
         console.log(
           "there was an error signing up",
           err.response.data.errorMessage
         );
         setError(err.response.data.errorMessage);
       });
   };

  return (
    <div>
      <h2>Sign up with us</h2>
      <form onSubmit={handleSignup}>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Sign Up</button>
      </form>
      {error ? <h4 className="error-message">{error}</h4> : null}
      <button onClick={() => nav("/")}>Go Back</button>
    </div>
  );
}
