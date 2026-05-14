import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Loader from './components/Loader';

// Import Pages
import Login from './pages/Login';
import Home from './pages/Home';
import LocalNews from './pages/LocalNews';
import Profile from './pages/Profile';
import SavedPosts from './pages/SavedPosts';

// Protected Route Component (Beginner Friendly)
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('currentUser');
  if (!user) {
    // Redirect to login if user is not logged in
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Simulate initial loading for a modern feel
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5s loading time
    
    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger loading effect on route change

  return (
    <div className="app-container">
      {/* Navbar will only show if user is logged in (handled inside Navbar component) */}
      <Navbar />
      
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/local" 
            element={
              <ProtectedRoute>
                <LocalNews />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/saved" 
            element={
              <ProtectedRoute>
                <SavedPosts />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
