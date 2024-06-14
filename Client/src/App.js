import React, { useState } from 'react';
import './App.css';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      });

      const result = await response.json();
      alert(result.message);
      const token = result.token;
      document.cookie = `token=${token}; path=/`;
      console.log(result.user);

      localStorage.setItem('id',result.user.hospital);
      localStorage.setItem('role',result.user.Roll);
      window.location.href='/machines';
      localStorage.setItem('IsLogging', true);
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <main className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button-i"type="submit">Login</button>
        </form>
      </main>
    </div>
  );
};




export default LoginPage;