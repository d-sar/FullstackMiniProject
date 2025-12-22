import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import ProjectList from './components/Project/ProjectList';
import ProjectDetail from './components/Project/ProjectDetail';
import { useAuth } from './context/AuthContext';
import './App.css';

// Layout pour les pages protégées
const ProtectedLayout = ({ children }) => {
  return (
    <>
    
      <Navbar/>
      
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </>
  );
};

// Composant pour rediriger les utilisateurs authentifiés
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function AppContent() {
  return (
    <div className="App">
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Routes publiques */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Routes protégées */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <ProjectList />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <ProjectDetail />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirection pour routes non trouvées */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;