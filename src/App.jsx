import { Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
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
  return (
    <div className="app-container">
      {/* Navbar will only show if user is logged in (handled inside Navbar component) */}
      <Navbar />
      
      <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
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
    </div>
  );
}

export default App;
