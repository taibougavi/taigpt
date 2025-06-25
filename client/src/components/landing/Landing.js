import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Zap, Shield, Users, Sparkles } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Intelligent Conversations',
      description: 'Engage in natural, context-aware conversations with advanced AI technology.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Get instant responses with our optimized AI processing engine.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your conversations are encrypted and protected with enterprise-grade security.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Multi-User Support',
      description: 'Perfect for teams and individuals with personalized conversation history.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-8 flex items-center justify-center"
            >
              <span className="text-white text-4xl font-bold font-sf-display">T</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-7xl font-sf-display font-bold text-white mb-6"
            >
              Welcome to{' '}
              <span className="gradient-text">TAIGPT</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 font-sf-text mb-8 max-w-2xl mx-auto"
            >
              Experience the future of AI conversation with our ChatGPT-inspired platform, 
              featuring Apple-inspired design and Stripe-style graphics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="apple-button text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-sf-text font-medium text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  Sign In
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-sf-display font-bold text-white mb-6">
              Why Choose TAIGPT?
            </h2>
            <p className="text-xl text-white/70 font-sf-text max-w-2xl mx-auto">
              Discover the features that make TAIGPT the perfect AI conversation companion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card text-center hover-lift"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-sf-display font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-sf-text">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="card max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-sf-display font-bold text-white">
                  Try It Now
                </h2>
              </div>
              <p className="text-white/70 font-sf-text mb-8 text-lg">
                Experience TAIGPT with our demo account. No registration required to explore the features.
              </p>
              <div className="bg-white/5 rounded-xl p-6 mb-8">
                <h3 className="text-white font-sf-display font-semibold mb-4">Demo Credentials</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-white/60 text-sm font-sf-text">Email:</p>
                    <p className="text-white font-sf-text">demo@taigpt.com</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-sf-text">Password:</p>
                    <p className="text-white font-sf-text">demo123</p>
                  </div>
                </div>
              </div>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="apple-button text-lg px-8 py-4"
                >
                  Start Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white text-xl font-bold font-sf-display">T</span>
            </div>
            <span className="text-2xl font-sf-display font-bold text-white">TAIGPT</span>
          </div>
          <p className="text-white/60 font-sf-text mb-4">
            © 2024 TAIGPT. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors font-sf-text">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors font-sf-text">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors font-sf-text">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 