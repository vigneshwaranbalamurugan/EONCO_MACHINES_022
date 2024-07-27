import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole,setUserRole] = useState('');
  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserRole('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
