import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/home');
    }
  }, [navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill all fields before registering.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check again.');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('myNewsUsers')) || [];
    const usernameExists = savedUsers.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {
      setError('That username is already taken. Please choose another one.');
      return;
    }

    const updatedUsers = [...savedUsers, { username, password }];
    localStorage.setItem('myNewsUsers', JSON.stringify(updatedUsers));

    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Register a new MyNews profile.</p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
            Register
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button type="button" className="btn btn-outline btn-block" onClick={() => navigate('/')}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
