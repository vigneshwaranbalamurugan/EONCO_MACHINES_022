import React, { useState } from 'react';
import '../styles/login.css';
import loginn from '../assets/Login.png';
import Loader from './Loader';
import loginLogo from '../assets/Logo_IMS.jpg';
import hide from '../assets/hide.png';
import { useToast } from './toaster';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuth(); 
  const setToastData = useToast();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        setToastData({ status:'success', message: result.message});
        localStorage.setItem('id', result.user.hospital);
        login(result.user.Roll);
        setTimeout(
          () => {
            navigate('/machines');
          }, 1000
        );
      } else {
        setToastData({ status:'failure', message: result.message });
      }
    } catch (error) {
      setToastData({ status:'failure', message: 'Login failed. Please try again.'});
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  return (
    <div className="head-container"> {loading &&
      <Loader />
    }
      <div className="login-left-side">
        <img src={loginn} alt="Login Visual" className="login-image" />
      </div>
      <div className="login-right-side">
        <main className="login-container">
          <img src={loginLogo} alt="IMS Portal Logo" className="login-logo"/>
          <p className='login-detail'>Get Started with IMS Portal</p>
          <br/>
          <p className='login-quote'>Your Tools for Better Health</p>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-input-group">
              <label htmlFor="email">Email address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder='Enter email address'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
            <label htmlFor="password">Password:</label>
            <div className="login-password-input-wrapper">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="login-password-toggle-icon" onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? <img src={hide} alt="hide"/> : '👁️'}
                </span>
              </div>

            </div>
            <button className="login-button-i" type="submit">Login</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;