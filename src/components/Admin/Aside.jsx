import React from "react";
import { NavLink } from "react-router-dom";
function Aside() {
  return (
    <div className="box-border shadow-lg shadow-slate-700 w-[20%] flex flex-col gap-8">
      <NavLink
        className="font-bold text-2xl p-5"
        style={({ isActive }) =>
          isActive ? { backgroundColor: "black", color: "white" } : undefined
        }
        to="/admin/users"
      >
        Users
      </NavLink>
      <NavLink
        className="font-bold text-2xl p-5"
        style={({ isActive }) =>
          isActive ? { backgroundColor: "black", color: "white" } : undefined
        }
        to="/admin/authors"
      >
        Authors
      </NavLink>
    </div>
  );
}

export default Aside;