import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import AuthContext from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Chat from './components/chat/Chat';
import Landing from './components/landing/Landing';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-sf-display font-semibold">Loading TAIGPT...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      <div className="App min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to="/chat" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Landing />
                  </motion.div>
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                user ? (
                  <Navigate to="/chat" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Login />
                  </motion.div>
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? (
                  <Navigate to="/chat" replace />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Register />
                  </motion.div>
                )
              } 
            />
            <Route 
              path="/chat" 
              element={
                user ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-screen"
                  >
                    <Navbar />
                    <Chat />
                  </motion.div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="*" 
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-screen flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <h1 className="text-6xl font-sf-display font-bold mb-4">404</h1>
                    <p className="text-xl font-sf-text mb-8">Page not found</p>
                    <button 
                      onClick={() => window.history.back()}
                      className="apple-button"
                    >
                      Go Back
                    </button>
                  </div>
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </AuthContext.Provider>
  );
}

export default App; 