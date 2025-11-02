import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FaGavel } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => alert("Signed Out!"))
      .catch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium px-3 py-2 rounded-md hover:text-indigo-600 transition ${
              isActive ? "underline underline-offset-4 text-indigo-600" : "text-base-content"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-products"
          className={({ isActive }) =>
            `font-medium px-3 py-2 rounded-md hover:text-indigo-600 transition ${
              isActive ? "underline underline-offset-4 text-indigo-600" : "text-base-content"
            }`
          }
        >
          All Products
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/my-products"
              className={({ isActive }) =>
                `font-medium px-3 py-2 rounded-md hover:text-indigo-600 transition ${
                  isActive ? "underline underline-offset-4 text-indigo-600" : "text-base-content"
                }`
              }
            >
              My Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bids"
              className={({ isActive }) =>
                `font-medium px-3 py-2 rounded-md hover:text-indigo-600 transition ${
                  isActive ? "underline underline-offset-4 text-indigo-600" : "text-base-content"
                }`
              }
            >
              My Bids
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 border-b border-gray-200">
      <div className="navbar-start">
        {/* mobile-dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-2 p-2 bg-base-100 rounded-box w-52 space-y-1"
          >
            {navLinks}
          </ul>
        </div>

        {/* logo-section */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-indigo-600"
        >
          <FaGavel className="w-6 h-6" />
          <span>BidX</span>
        </Link>
      </div>

      {/* center-links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>

      {/* right-section */}
      <div className="navbar-end gap-2">
        {!user ? (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-indigo">
              Login
            </Link>
            <Link to="/register" className="btn btn-indigo text-white">
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-indigo-600"
              />
            )}
            <button
              onClick={handleSignOut}
              className="btn btn-indigo text-white"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
