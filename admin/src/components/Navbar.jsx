import React from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { adminUser, logout } = useAdminAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin" className="text-lg font-semibold">Admin Panel</Link>
        <div>
          {adminUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Hey, {adminUser.username || adminUser.email}!</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 