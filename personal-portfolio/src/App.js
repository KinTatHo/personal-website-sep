import React, { useState, useEffect } from "react";
import { HomePage } from "./components/PortfolioComponents/HomePage";
import { Experience } from "./components/PortfolioComponents/Experience";
import { Projects } from "./components/PortfolioComponents/Projects";
import { Skills } from "./components/PortfolioComponents/Skills";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingPage } from "./components/LoadingPage";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [HomePage, Experience, Projects, Skills];

  const handleLoadComplete = () => {
    setTimeout(() => setIsLoading(false), 1500);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, sections.length]);

  const handleNavClick = (index) => {
    setCurrentSection(index);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="loader">
          <LoadingPage onLoadComplete={handleLoadComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-screen overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900"
        >
          <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 bg-gray-900 bg-opacity-50">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                className={`mx-2 px-4 py-2 text-white rounded ${
                  currentSection === index ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                {['Home', 'Experience', 'Projects', 'Skills'][index]}
              </button>
            ))}
          </nav>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {React.createElement(sections[currentSection])}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;