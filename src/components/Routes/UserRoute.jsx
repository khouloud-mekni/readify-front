import React from "react";
import { Navigate } from "react-router";
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const isUser = localStorage.getItem("isUser");
  const isBanned = localStorage.getItem("isBanned");
  if (token && isUser === "true" && isBanned === "false") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;