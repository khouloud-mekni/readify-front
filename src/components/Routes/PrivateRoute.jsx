import React from "react";
import { Navigate } from "react-router";
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const isBanned = localStorage.getItem("isBanned");
  const isVerified = localStorage.getItem("isVerified");
  const isUser = localStorage.getItem("isUser");
  const isAdmin = localStorage.getItem("isAdmin");
  const isAuthor = localStorage.getItem("isAuthor");
  if (
    (token &&
      isBanned === "false" &&
      isVerified === "true" &&
      isUser === "true" &&
      isAdmin === "false") ||
    (token &&
      isBanned === "false" &&
      isVerified === "true" &&
      isAuthor === "true" &&
      isAdmin === "false") ||
    (token &&
      isBanned === "false" &&
      isVerified === "true" &&
      isAdmin === "true")
  ) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;