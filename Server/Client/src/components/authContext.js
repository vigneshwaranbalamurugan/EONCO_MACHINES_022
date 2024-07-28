import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole,setUserRole] = useState('');
  const navigate = useNavigate();

  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserRole('');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
