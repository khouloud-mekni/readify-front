import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
function PublicNavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="w-[100%] min-h-[80px] px-10 py-8 bg-[#d1d5db] text-white flex justify-between items-center sticky">
      <NavLink
        to="/"
        className="font-Popins font-bold text-xl text-black hover:text-[orange]"
      >
        Readify
      </NavLink>
      <div className=" min-w-[20%] flex justify-around items-center">
        {token ? (
          <NavLink
            to="/login"
            className="border-2 border-black px-4 py-2 font-medium text-black hover:text-[orange]"
            onClick={() => handleLogout()}
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className="border-2 border-black px-4 py-2 font-medium text-black hover:text-[orange]"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="border-2 border-black px-4 py-2 bg-black text-black font-medium hover:text-[orange]"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default PublicNavBar;