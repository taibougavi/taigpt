import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, MessageCircle } from 'lucide-react';
import AuthContext from '../../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold font-sf-display">T</span>
            </div>
            <span className="text-xl font-sf-display font-bold text-white">TAIGPT</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/80 hover:text-white transition-colors font-sf-text"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold font-sf-display">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-white font-sf-text font-medium text-sm">
                  {user?.name || 'User'}
                </p>
                <p className="text-white/60 font-sf-text text-xs">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>

            {/* Desktop User Menu */}
            <div className="hidden md:block relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/80 hover:text-white transition-colors p-2"
              >
                <User className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 pb-4 border-b border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold font-sf-display">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-sf-text font-medium">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-white/60 font-sf-text text-sm">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-2">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10"
                >
                  <User className="w-5 h-5" />
                  <span className="font-sf-text">Profile</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-sf-text">Settings</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors p-3 rounded-lg hover:bg-red-500/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-sf-text">Sign Out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block absolute top-16 right-4 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50"
          >
            <div className="p-4 space-y-2">
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10"
              >
                <User className="w-5 h-5" />
                <span className="font-sf-text">Profile</span>
              </motion.button>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10"
              >
                <Settings className="w-5 h-5" />
                <span className="font-sf-text">Settings</span>
              </motion.button>
              
              <div className="border-t border-white/20 my-2"></div>
              
              <motion.button
                whileHover={{ x: 5 }}
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors p-3 rounded-lg hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-sf-text">Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 