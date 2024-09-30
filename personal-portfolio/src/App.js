import React, { useState } from "react";
import { AboutMe } from "./components/AboutMe";
import { ContactMe } from "./components/ContactMe";
import { HomePage } from "./components/PortfolioComponents/HomePage";
import { Experience } from "./components/PortfolioComponents/Experience";
import { MacOSDesktop } from "./components/MacOSDesktopComponents/MacOSDesktop";
import { Projects } from "./components/PortfolioComponents/Projects";
import { Skills } from "./components/PortfolioComponents/Skills";
import { SkillsNetwork } from "./components/PortfolioComponents/SkillsNetwork";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingPage } from "./components/LoadingPage";
import { NavBar } from "./components/NavBar";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWebsiteOpen, setIsWebsiteOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    HomePage,
    AboutMe,
    Experience,
    Projects,
    Skills,
    ContactMe,
    SkillsNetwork,
  ];

  const handleLoadComplete = () => {
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleNavClick = (index) => {
    setCurrentSection(index);
  };

  const handleOpenWebsite = () => {
    setIsWebsiteOpen(true);
  };

  const handleCloseWebsite = () => {
    setIsWebsiteOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="loader">
          <LoadingPage onLoadComplete={handleLoadComplete} />
        </motion.div>
      ) : (
        <MacOSDesktop onOpenWebsite={handleOpenWebsite}>
          {isWebsiteOpen && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 m-8 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-lg shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-gray-800 p-2 flex justify-between items-center">
                <div className="text-white pixel-font">Kin Tat's Portfolio Adventure</div>
                <button
                  onClick={handleCloseWebsite}
                  className="text-white hover:text-red-500 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
              <NavBar currentSection={currentSection} onNavClick={handleNavClick} />
              <div className="flex-grow overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.createElement(sections[currentSection])}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </MacOSDesktop>
      )}
    </AnimatePresence>
  );
};

export default App;