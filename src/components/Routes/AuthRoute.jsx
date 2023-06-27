import React from "react";
import { Navigate } from "react-router";
function AuthRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default AuthRoute;