import React, { useState } from 'react';
import '../styles/login.css';

const LoginPag = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    localStorage.removeItem('IsLogging');
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
          <button type="submit">Logn</button>
        </form>
      </main>
    </div>
  );
};




export default LoginPag;