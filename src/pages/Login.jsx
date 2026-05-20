import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to Home if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    // Read registered users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('myNewsUsers')) || [];
    const matchingUser = savedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchingUser) {
      // Save logged-in session in localStorage
      localStorage.setItem('currentUser', matchingUser.username);
      navigate('/home');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Login to access your MyNews feed.</p>

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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>Don’t have an account?</p>
          <Link to="/register" className="btn btn-outline" style={{ width: '100%' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
