import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,Navigate} from 'react-router-dom';
import LoginPage from './components/login';
import Layout from './Layout/Layout';
import reportWebVitals from './reportWebVitals';
import LoginPag from './components/admin';
import Machine from './components/machineshsptl';
import AddMachineForm from './components/addmachines';

const IsLogging=localStorage.getItem('IsLogging');
console.log(IsLogging);


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
       {path:"login",element:<LoginPage/>},
       {path:"add",element:IsLogging?<AddMachineForm/>:<Navigate to="/login" />},
       {path:"machines", element:IsLogging?<Machine/> :<Navigate to="/login" />},
       {path:"admin", element:IsLogging ? <LoginPag/> :<Navigate to="/login" />}
      ]
    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
