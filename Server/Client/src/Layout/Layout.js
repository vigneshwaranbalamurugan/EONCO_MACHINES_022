import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
