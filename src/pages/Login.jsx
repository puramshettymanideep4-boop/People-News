import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect to home
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (username.trim() && password.trim()) {
      // Save username to localStorage to represent a logged-in session
      localStorage.setItem('currentUser', username);
      // Navigate to Home page
      navigate('/home');
    } else {
      alert("Please enter both username and password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">📰 MyNews</h1>
        <p className="login-subtitle">Telangana Local Community News</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
