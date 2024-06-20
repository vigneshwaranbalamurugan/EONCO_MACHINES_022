import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const Role=localStorage.getItem('role');
    const handleLogout = () => {
        // Clear all local storage
        localStorage.removeItem('IsLogging');
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className='navbar-item'>Welcome,{Role}</li>
                <li className="navbar-item" onClick={() => navigate('/machines')}>Dashboard</li>
                <li className="navbar-item" onClick={() => navigate('/add')}>Add</li>
                <li className="navbar-item" onClick={handleLogout}>Logout</li>
            </ul>
        </nav>
    );
};

export default Navbar;
