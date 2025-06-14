import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import {
  MdDashboard,
  MdPostAdd,
  MdManageAccounts,
  MdOutlineMenuBook,
} from "react-icons/md";

const BuyerDashboard = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setOpenMenu(!openMenu);

  const handleNavigation = (path) => {
    setOpenMenu(false); // close menu after navigation
    navigate(path);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 text-blue-700 font-medium"
      >
        <FaUserCircle className="text-xl" />
        <span>Hi, Harshita</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            openMenu ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.25 7.75L10 12.5l4.75-4.75" />
        </svg>
      </button>

      {openMenu && (
        <div className="absolute mt-2 w-64 bg-white shadow-lg rounded-lg border z-50">
          <div className="px-4 py-3 border-b">
            <div className="font-semibold text-lg flex items-center justify-between">
              Harshita{" "}
              <a
                href="#"
                onClick={() => handleNavigation("/buyer/profile")}
                className="text-blue-500 text-sm underline"
              >
                View Profile
              </a>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              +91-8305188620
              <FaCheckCircle className="text-green-500" />
              <span className="text-green-600 text-xs">Verified</span>
            </div>
          </div>

          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation("/buyer/dashboard")}
            >
              <MdDashboard />
              My Dashboard
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation("/buyer/post-inquiry")}
            >
              <MdPostAdd />
              Post Buy Requirement
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation("/buyers/Manage-requirement")}
            >
              <MdManageAccounts />
              Manage Requirements
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation("/buyer/directory")}
            >
              <MdOutlineMenuBook />
              Products / Services Directory
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-red-500"
              onClick={() => handleNavigation("/login")}
            >
              <FaSignOutAlt />
              Sign With Different User
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
