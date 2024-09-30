import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Code,
  Brain,
  Mail,
  Network,
} from "lucide-react";

const sections = [
  { icon: Home, label: "Home" },
  { icon: User, label: "About Me" },
  { icon: Briefcase, label: "Experience" },
  { icon: Code, label: "Projects" },
  { icon: Brain, label: "Skills" },
  { icon: Mail, label: "Contact Me" },
  { icon: Network, label: "Skills Network" },
];

export const NavBar = ({ currentSection, onNavClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const progress = (currentSection / (sections.length - 1)) * 100;

  return (
    <nav className="bg-gray-900 p-4">
      <div className="flex justify-center items-center space-x-4">
        {sections.map((section, index) => (
          <div key={index} className="relative">
            <motion.button
              onClick={() => onNavClick(index)}
              className={`p-2 rounded-lg ${
                currentSection === index
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              } transition-colors duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <section.icon
                size={24}
                className={`${
                  currentSection === index ? "text-white" : "text-gray-300"
                }`}
              />
            </motion.button>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap"
                >
                  {section.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-2 bg-gray-700 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </nav>
  );
};
