// components/PortfolioComponents/HomePage.js (Revised)

import React from "react"; 
import { motion } from "framer-motion";
import { TypewriterEffect } from "../TypeWriterEffect"; 
// Keeping icons, maybe adjust colors below
import { Gamepad2, Code, Activity } from "lucide-react"; 
import { ThreeBackground } from "../background/ThreeBackground"; // Assuming usage

// Animation variants for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger delay between children
      delayChildren: 0.3,  // Delay before starting children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// Variants for icons with subtle floating animation
const iconVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0], // Float up and down
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
}

export const HomePage = () => {
  return (
    // Ensure container fills the screen and handles centering
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4 relative">
      <ThreeBackground /> 

      {/* Main content container with staggered animation */}
      <motion.div
        className="border-2 border-blue-500/30 p-8 md:p-12 rounded-xl bg-gray-900/60 backdrop-blur-lg relative z-10 shadow-xl max-w-3xl w-full" // Adjusted styling: thinner border, more padding, rounded-xl, bg opacity, backdrop blur, shadow, max-width
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          // Name animation - using item variant
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-300 mb-3 pixel-font" // Adjusted color, margin
          variants={itemVariants}
        >
          Ho Kin Tat
        </motion.h1>
        
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl text-blue-100 mb-6 pixel-font" // Adjusted color, margin
          variants={itemVariants}
        >
          <TypewriterEffect
            words={[
              "Software Engineer",
              "AI Enthusiast",
              "Problem Solver",
              "Web Developer", 
            ]}
            loop
          />
        </motion.h2>
        
        <motion.p
          className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed" // Adjusted size, color, margin, centering, line height
          variants={itemVariants}
        >
          Passionate about building innovative solutions and exploring new technologies in web development and artificial intelligence.
        </motion.p>
        
        {/* Icons container */}
        <motion.div 
          className="flex justify-center space-x-6 mb-10" // Increased spacing, margin
          variants={itemVariants}
        >
          {/* Apply floating animation variant to each icon wrapper */}
          <motion.div variants={iconVariants} initial="initial" animate="animate" style={{ transitionDelay: '0s' }}>
            <Gamepad2 size={40} className="text-green-400/80 hover:text-green-300 transition-colors" />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" animate="animate" style={{ transitionDelay: '0.2s' }}> 
            <Code size={40} className="text-blue-400/80 hover:text-blue-300 transition-colors" />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" animate="animate" style={{ transitionDelay: '0.4s' }}>
            <Activity size={40} className="text-orange-400/80 hover:text-orange-300 transition-colors" />
          </motion.div>
        </motion.div>
        
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 pixel-font shadow-md hover:shadow-lg" // Added gradient, transitions
          whileHover={{ scale: 1.05, y: -2 }} // Hover effect
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          // onClick={() => console.log("Navigate somewhere...")} 
        >
          Explore My Work 
        </motion.button>
      </motion.div>
    </div>
  );
};