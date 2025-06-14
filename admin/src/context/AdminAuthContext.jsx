import React, { createContext, useContext, useState, useEffect } from 'react';
import adminApi from '../utils/adminApi'; // This will be created soon
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null); // Initialize as null, let API confirm
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const { data } = await adminApi.get('/me'); // Always make API call
      if (data.user && data.user.role === 'admin') {
        setAdminUser(data.user);
      } else {
        setAdminUser(null);
      }
    } catch (error) {
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await adminApi.post('/login', credentials); // Send credentials including role
      if (data.user && data.user.role === 'admin') {
        setAdminUser(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: 'Access denied. Only administrators can log in here.' };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Admin login failed' };
    }
  };

  const logout = async () => {
    try {
      await adminApi.get('/logout'); // Assuming an admin-specific /logout endpoint
      setAdminUser(null);
      navigate('/admin/login');
    } catch (error) {
      setAdminUser(null);
    }
  };

  const value = {
    adminUser,
    loading,
    login,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}; 