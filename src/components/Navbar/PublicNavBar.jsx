import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
function PublicNavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isUser = localStorage.getItem("isUser");
  const isAuthor = localStorage.getItem("isAuthor");
  const id = localStorage.getItem("id");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const activeStyle = { backgroundColor: "white", color: "black" };
  // const randomStyle = { border: "2px white solid", padding: "2px 4px", fontWheight: "800", color: "white",  };
  return (
    <div className="w-[100%] min-h-[80px] px-10 py-8 bg-black text-white flex justify-between items-center">
      <NavLink
        to="/"
        className="font-Popins font-bold text-xl text-white hover:bg-[white] hover:text-black"
      >
       Readify
      </NavLink>
      <div className=" min-w-[20%] flex justify-around items-center">
        {token && isUser === "true" && (
          <NavLink
            to={`/user-profile`}
            className="border-2 border-white px-4 py-2 font-medium text-white hover:bg-[white] hover:text-black"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Profile
          </NavLink>
        )}
        {token && isAuthor === "true" && (
          <>
            <NavLink
              to={`/myBooks`}
              className="border-2 border-white px-4 py-2 font-medium text-white hover:bg-[white] hover:text-black"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My books
            </NavLink>
            <NavLink
              to={`/author-profile`}
              className="border-2 border-white px-4 py-2 font-medium text-white hover:bg-[white] hover:text-black"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Profile
            </NavLink>
          </>
        )}
        {token ? (
          <>
            <NavLink
              to="/login"
              className="border-2 border-white px-4 py-2 font-medium text-white hover:bg-[white] hover:text-black"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleLogout()}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="border-2 border-white px-4 py-2 font-medium text-white hover:bg-[white] hover:text-black"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="border-2 border-white px-4 py-2 bg-black text-white font-medium hover:bg-[white] hover:text-black"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
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