import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import { useAuth } from '../components/authContext';
import { Outlet } from "react-router-dom";

const Layout = () => {
    const { isLoggedIn } = useAuth();
    return (
        <div className="layout-container">
            <Header />
            <div className="main-content">
                {isLoggedIn && <Navbar/>}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
