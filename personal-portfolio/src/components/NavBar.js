// components/NavBar.js (Revised for Responsiveness)

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  Code,
  Brain,
  Mail,
  Network,
  Menu, // Hamburger icon
  X,      // Close icon
} from "lucide-react";

// Define sections (same as before)
const sections = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/about", icon: User, label: "About Me" },
  { path: "/experience", icon: Briefcase, label: "Experience" },
  { path: "/projects", icon: Code, label: "Projects" },
  { path: "/skills", icon: Brain, label: "Skills" },
  { path: "/skills-network", icon: Network, label: "Skills Network" },
  { path: "/contact", icon: Mail, label: "Contact Me" },
];

// Animation variants for the mobile menu
const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -20 }
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Determine current section index (for optional progress bar)
  const currentSectionIndex = sections.findIndex(sec => location.pathname === sec.path);
  const progress = currentSectionIndex >= 0 ? (currentSectionIndex / (sections.length - 1)) * 100 : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Optional: Add a logo or name here */}
        <NavLink to="/" className="text-white text-lg font-bold pixel-font hover:text-blue-300 transition">
          Kin Tat Ho
        </NavLink>

        {/* Desktop Navigation (Hidden on small screens) */}
        <div className="hidden md:flex justify-center items-center space-x-3">
          {sections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              end={section.path === "/"} // Add 'end' prop for home link
              className={({ isActive }) =>
                `p-2 rounded-lg ${
                  isActive ? "bg-blue-600 shadow-inner" : "bg-gray-700/50 hover:bg-gray-600"
                } transition-all duration-300 block group relative` // Added group/relative for tooltip
              }
              aria-label={section.label}
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <section.icon
                  size={20} // Slightly smaller icons for desktop bar
                  className={location.pathname === section.path ? "text-white" : "text-gray-300"}
                />
              </motion.div>
              {/* Desktop Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {section.label}
              </div>
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button (Visible on small screens) */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none p-2"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

       {/* Optional Progress Bar (Desktop only or adjusted for mobile) */}
       <div className="hidden md:block mt-3 bg-gray-700 h-1 rounded-full w-1/2 mx-auto opacity-70">
         <motion.div
           className="h-full bg-blue-400"
           initial={{ width: 0 }}
           animate={{ width: `${progress}%` }}
           transition={{ duration: 0.5, ease: "easeOut" }}
         />
       </div>

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mt-3 pt-3 border-t border-gray-700"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {sections.map((section) => (
              <motion.div key={section.path} variants={menuItemVariants}>
                <NavLink
                  to={section.path}
                  end={section.path === "/"}
                  className={({ isActive }) =>
                     `flex items-center px-3 py-3 text-lg rounded-md ${
                       isActive ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                     } transition-colors duration-200 mb-1` // Added mb-1
                  }
                  // onClick={() => setIsOpen(false)} // Optional: close menu on click even without route change
                >
                  <section.icon size={22} className="mr-3" />
                  {section.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};