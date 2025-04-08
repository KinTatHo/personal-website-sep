import React from "react"; // Removed useState, useEffect as they are no longer needed for gamification
import { motion } from "framer-motion";
import { TypewriterEffect } from "../TypeWriterEffect"; // Assuming you still want this cool effect
import { Gamepad2, Code, Activity } from "lucide-react"; // Keeping icons for visual flair
import { PixelBackground } from "../background/PixelBackground"; // Keeping background for now

export const HomePage = () => {
  // Removed score, level, showAchievement state and useEffect

  // Removed incrementScore function

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      {/* PixelBackground remains for visual style, can be swapped later */}
      <PixelBackground />

      <motion.div
        // Container for main content with animation
        className="border-4 border-blue-500 p-8 rounded-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.h1
          // Name animation
          className="text-5xl md:text-7xl font-bold text-blue-400 mb-4 pixel-font" // Kept pixel-font for style
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ho Kin Tat
        </motion.h1>
        <h2 className="text-2xl md:text-3xl text-blue-200 mb-8 pixel-font">
          {/* Using TypewriterEffect for professional roles */}
          <TypewriterEffect
            words={[
              "Software Engineer",
              "AI Enthusiast",
              "Problem Solver",
              "Web Developer", // Added another relevant role
            ]}
            loop
          />
        </h2>
        <motion.p
          // Professional description, removed level reference
          className="text-lg text-white max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Updated tagline */}
          Passionate about building innovative solutions and exploring new technologies.
        </motion.p>
        <div className="flex justify-center space-x-4 mb-8">
          {/* Icons remain as visual elements */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Gamepad2 size={40} className="text-green-400" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Code size={40} className="text-blue-400" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Activity size={40} className="text-orange-400" />
          </motion.div>
        </div>
        <motion.button
          // Button with updated text, removed score display and onClick score logic
          className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 pixel-font"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          // onClick could navigate to projects or about section, for example
          // onClick={() => console.log("Navigate somewhere...")} 
        >
          {/* Updated Button Text */}
          Explore My Work 
        </motion.button>
      </motion.div>

      {/* Removed the achievement popup motion.div */}
    </div>
  );
};