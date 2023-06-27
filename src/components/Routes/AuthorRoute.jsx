import React from "react";
import { Navigate } from "react-router";
function AuthorRoute({ children }) {
  const token = localStorage.getItem("token");
  const isAuthor = localStorage.getItem("isAuthor");
  if (token && isAuthor === "true") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default AuthorRoute;