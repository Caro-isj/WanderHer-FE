import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const userToLogin = { email, password };

    axios
      .post("http://localhost:5005/auth/login", userToLogin)
      .then((response) => {
        console.log("you logged in", response.data);

        localStorage.setItem("authToken", response.data.authToken);

        return authenticateUser();
      })
      .then(() => nav("/dashboard"))
      .catch((err) => {
        console.log("there was an error logging in", err.response.data.message);
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
      </form>
      <button onClick={() => nav("/")}>Go Back</button>
      {error ? <h4 className="error-message">{error}</h4> : null}
    </div>
  );
}
