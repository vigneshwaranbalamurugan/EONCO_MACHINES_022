// ToastContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastify.css'

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    if (toastData) {
      const { message, color } = toastData;
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: `toast-${color}`,
      });
      setToastData(null); 
    }
  }, [toastData]);

  return (
    <ToastContext.Provider value={setToastData}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          width: 'auto',
          maxWidth: '100%',
          zIndex: 9999,
          padding: '0 15px',
        }}
      />

    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

