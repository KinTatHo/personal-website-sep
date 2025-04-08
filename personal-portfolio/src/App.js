// App.js (Revised)

import React, { useState, useEffect } from 'react';
// Import routing components
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';

// Import your main section/page components
import { HomePage } from './components/PortfolioComponents/HomePage';
import { AboutMe } from './components/AboutMe';
import { Experience } from './components/PortfolioComponents/Experience';
import { Skills } from './components/PortfolioComponents/Skills';
import { Projects } from './components/PortfolioComponents/Projects';
import { SkillsNetwork } from './components/PortfolioComponents/SkillsNetwork';
import { ContactMe } from './components/ContactMe';

// Import layout and utility components
import { NavBar } from './components/NavBar'; // Use the modified NavBar below
import { LoadingPage } from './components/LoadingPage'; // Use the modified LoadingPage
// Assuming you created ThreeBackground as discussed
import { ThreeBackground } from './components/background/ThreeBackground'; 

// Main App component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading time (adjust as needed)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Example: 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // Component to render the main content after loading
  const AppContent = () => {
    const location = useLocation(); // Hook to get current location for animations

    return (
      <div className="relative min-h-screen"> {/* Ensure background covers screen */}
        {/* Render background globally */}
        <ThreeBackground /> 
        
        {/* Render NavBar globally */}
        <NavBar /> 

        {/* Main content area with padding for fixed NavBar */}
        <main className="relative z-10 pt-20 md:pt-24"> {/* Adjust padding top based on NavBar height */}
          {/* AnimatePresence handles transitions between routes */}
          <AnimatePresence mode="wait"> 
            <Routes location={location} key={location.pathname}>
              {/* Define routes for each section/page */}
              <Route path="/" element={
                  <PageWrapper><HomePage /></PageWrapper>
              }/>
              <Route path="/about" element={
                  <PageWrapper><AboutMe /></PageWrapper>
              }/>
              <Route path="/experience" element={
                   <PageWrapper><Experience /></PageWrapper>
              }/>
              <Route path="/skills" element={
                  <PageWrapper><Skills /></PageWrapper>
              }/>
              <Route path="/skills-network" element={
                  <PageWrapper><SkillsNetwork /></PageWrapper>
              }/>
              <Route path="/projects" element={
                  <PageWrapper><Projects /></PageWrapper>
              }/>
              <Route path="/contact" element={
                  <PageWrapper><ContactMe /></PageWrapper>
              }/>
              {/* Optional: Add a 404 Not Found route here */}
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </AnimatePresence>
        </main>
         {/* Optional: Add a Footer component here */}
      </div>
    );
  };

  // Wrapper component for page transition animations
  const PageWrapper = ({ children }) => (
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
      >
          {children}
      </motion.div>
  );

  // Render LoadingPage or AppContent based on isLoading state
  return (
    <Router> {/* Wrap everything in BrowserRouter */}
      {/* Use AnimatePresence for smooth transition between Loading and App */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" exit={{ opacity: 0 }}>
            {/* Use the modified LoadingPage */}
            <LoadingPage onLoadComplete={() => setIsLoading(false)} /> 
          </motion.div>
        ) : (
          <motion.div key="appContent" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AppContent />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
};

export default App;