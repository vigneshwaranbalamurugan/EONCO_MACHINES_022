import React,{useEffect} from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from './components/authContext';
import LoginPage from './components/login';
import Layout from './Layout/Layout';
import LoginPag from './components/admin';
import Machine from './components/machineshsptl';
import AddMachineForm from './components/addmachines';
import ProtectedRoute from './components/protectedRoutes';
import ErrorPage from './components/errorPage';
import favicon from './assets/favicon.ico';

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
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Machine />
        </ProtectedRoute>
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
  useEffect(() => {
    changeFavicon('./assets/favicon.ico');
  }, []); // Empty dependency array ensures it runs once on mount

  const changeFavicon = (favicon) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  const { isLoggedIn } = useAuth();
  const routes = createRoutes(isLoggedIn);
  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default AppRouter;