import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu, X, ShoppingBag, Globe, Factory, ClipboardList, Send, Tag, Inbox,
  Package, Megaphone, Mail, Home, User, LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  {
    label: "Home",
    icon: <Home size={16} />,
    path: "/",
  },
  {
    label: "For Buyers",
    icon: <Globe size={16} />,
    submenu: [
      { label: "Manage requirement", icon: <ClipboardList size={16} />, path: "/buyers/Manage-requirement" },
      { label: "Post Buy Requirement", icon: <Send size={16} />, path: "/buyer/post-inquiry" },
    ],
  },
  {
    label: "For Suppliers",
    icon: <Tag size={16} />,
    submenu: [
      { label: "Shortlisted(Favourites)", icon: <Tag size={16} />, path: "/sellers/favourites" },
      { label: "Latest Buy Leads", icon: <Inbox size={16} />, path: "/sellers/leads" },
      { label: "History", icon: <Package size={16} />, path: "/sellers/history" },
    ],
  },
  {
    label: "More",
    icon: <Megaphone size={16} />,
    submenu: [
      { label: "Contact Us", icon: <Mail size={16} />, path: "/contact" },
      { label: "Customer Support", icon: <Megaphone size={16} />, path: "/customerSupport" },
      { label: "Become a agent/affiliate", icon: <Factory size={16} />, path: "/agent" },
      // { label: "Pricing", icon: <Factory size={16} />, path: "/Pricing" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-gray-800">
          <ShoppingBag size={24} />
          <span>B2B Marketplace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700 relative items-center">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.submenu ? (
                <button className="hover:text-blue-600 flex items-center gap-1">
                  {item.icon} {item.label}
                </button>
              ) : (
                <Link to={item.path} className="hover:text-blue-600 flex items-center gap-1">
                  {item.icon} {item.label}
                </Link>
              )}
              {activeDropdown === item.label && item.submenu && (
                <div className="absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-60 z-50">
                  {item.submenu.map((subItem, subIdx) => (
                    <Link key={subIdx} to={subItem.path} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                      {subItem.icon} {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User size={20} />
                <span>Hello, {user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
                Sign In
              </Link>
              <Link to="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
        <div className="h-full p-4 flex flex-col overflow-y-auto">
          <button onClick={() => setIsOpen(false)} className="self-end p-2">
            <X size={24} />
          </button>

          {/* User Info in Mobile */}
          {user && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <User size={20} />
                <span>Hello, {user.name}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="mt-2 flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded w-full"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          )}

          {/* Render Shared Menu */}
          {menuItems.map((item, idx) => (
            <div key={idx} className="mb-2">
              {item.submenu ? (
                <div>
                  <h3 className="text-gray-600 font-semibold mt-3">{item.label}</h3>
                  {item.submenu.map((subItem, subIdx) => (
                    <Link
                      key={subIdx}
                      to={subItem.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded"
                    >
                      {subItem.icon} {subItem.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded"
                >
                  {item.icon} {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Auth Links in Mobile */}
          {!user && (
            <div className="mt-4 space-y-2">
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-center border rounded text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
