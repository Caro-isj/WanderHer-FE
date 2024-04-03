import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function IsProtected({ children }) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
