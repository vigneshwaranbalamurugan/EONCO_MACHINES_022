import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/authContext';
import { ToastProvider } from './components/toaster';
import LoginPage from './components/login';
import Layout from './Layout/Layout';
import reportWebVitals from './reportWebVitals';
import LoginPag from './components/admin';
import Machine from './components/machineshsptl';
import AddMachineForm from './components/addmachines';

// Function to create routes based on login status
const createRoutes = (isLoggedIn) => [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: isLoggedIn ? <Navigate to="/machines"/> :<LoginPage/> },
      { path: 'add', element: isLoggedIn ? <AddMachineForm /> : <Navigate to="/" /> },
      { path: 'machines', element: isLoggedIn ? <Machine /> : <Navigate to="/" /> },
      { path: 'admin', element: isLoggedIn ? <LoginPag /> : <Navigate to="/" /> },
    ],
  },
];



const AppRouter = () => {
  const { isLoggedIn } = useAuth();
  const routes = createRoutes(isLoggedIn);


  return <RouterProvider router={createBrowserRouter(routes)} />;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();