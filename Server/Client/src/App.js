import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from './components/authContext';
import LoginPage from './components/login';
import Layout from './Layout/Layout';
import LoginPag from './components/admin';
import Machine from './components/machineshsptl';
import AddMachineForm from './components/addmachines';
import ProtectedRoute from './components/protectedRoutes';
import ErrorPage from './components/errorPage';
// Function to create routes based on login status
const createRoutes = (isLoggedIn) => [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: isLoggedIn ? <Navigate to="/machines"/>:<LoginPage/> },
      { path: 'add', element:(
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <AddMachineForm />
        </ProtectedRoute>
      ), },
      { path: 'machines', element: (
          <Machine />
      ), },
      { path: 'admin', element: (
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <LoginPag />
        </ProtectedRoute>
      ), },
    ],
  },
];



const AppRouter = () => {
  const { isLoggedIn } = useAuth();
  const routes = createRoutes(isLoggedIn);
  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default AppRouter;