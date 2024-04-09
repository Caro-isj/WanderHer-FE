import axios from "axios";
import { createContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = () => {
    const theToken = localStorage.getItem("authToken");
    if (theToken) {
      return axios
        .get(`${API_URL}/auth/verify`, {
          headers: {
            authorization: `Bearer ${theToken}`,
          },
        })
        .then((response) => {
          console.log("from the authenticate user function", response.data);
          setUser(response.data);
          setIsLoading(false);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("there was an error authenticating the user", err);
          setUser(null);
          setIsLoading(false);
          setIsLoggedIn(false);
        });
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
