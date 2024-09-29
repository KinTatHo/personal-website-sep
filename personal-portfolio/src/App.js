import React, { useState } from "react";
import { HomePage } from "./components/PortfolioComponents/HomePage";
import { Experience } from "./components/PortfolioComponents/Experience";
import { Projects } from "./components/PortfolioComponents/Projects";
import { Skills } from "./components/PortfolioComponents/Skills";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingPage } from "./components/LoadingPage";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  const handleLoadComplete = () => {
    setTimeout(() => setIsLoading(false), 1500);
  };

  const sections = {
    home: <HomePage />,
    experience: <Experience />,
    projects: <Projects />,
    skills: <Skills />,
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
          className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 overflow-y-auto"
        >
          <nav className="sticky top-0 bg-gray-900 p-4 z-50">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className="mx-2 px-4 py-2 text-white hover:bg-blue-700 rounded"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {sections[currentSection]}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;