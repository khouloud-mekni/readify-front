import React from 'react'
import { Navigate } from 'react-router';
function AdminRoute({children}) {
  const token = localStorage.getItem("token");
  const isBanned = localStorage.getItem("isBanned");
  const isVerified = localStorage.getItem("isVerified");
  const isAdmin = localStorage.getItem("isAdmin");

  if ((token && isAdmin === "true")){
    return children;
  }else{
    return <Navigate to={'/login'}/>
  }
  
}

export default AdminRoute
