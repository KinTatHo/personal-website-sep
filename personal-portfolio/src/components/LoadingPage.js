import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Using a different icon, e.g., Loader or Aperture, instead of HardDrive/Zap
import { Loader, Aperture } from "lucide-react"; 

export const LoadingPage = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setLoadingText("System Ready!");
          // Trigger completion after a short delay
          setTimeout(onLoadComplete, 1000); 
          return 100;
        }
        // Update loading text based on progress
        if (next > 70) setLoadingText("Finalizing...");
        else if (next > 30) setLoadingText("Loading Assets...");
        return next;
      });
    }, 300); // Adjust interval timing as needed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [onLoadComplete]);


  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 relative text-white">
      {/* Using a subtle background animation */}
      <div className="absolute inset-0 z-0">
         {/* Example: Simple animated gradient or keep the particle effect */}
         {[...Array(15)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-blue-500 rounded-full opacity-10" // Reduced opacity
             initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`, 
                scale: Math.random() * 0.5 + 0.1 
             }}
             animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`, 
             }}
             transition={{
               duration: Math.random() * 10 + 10, // Slower animation
               repeat: Infinity,
               repeatType: "mirror", // Smoother back and forth
               ease: "easeInOut"
             }}
             style={{
               width: `${Math.random() * 10 + 5}px`, // Slightly larger dots
               height: `${Math.random() * 10 + 5}px`,
             }}
           />
         ))}
       </div>

      {/* Loading Icon Animation */}
      <motion.div
        className="relative mb-6" // Added margin bottom
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {/* Using Aperture or Loader icon */}
        <Aperture size={80} className="text-blue-400" /> 
        {/* <Loader size={80} className="text-blue-400" /> */}
      </motion.div>

      {/* Loading Text */}
      <motion.h2
        key={loadingText} // Add key to trigger animation on text change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 text-2xl font-bold text-white pixel-font" // Kept pixel-font
      >
        {loadingText}
      </motion.h2>

      {/* Progress Bar */}
      <motion.div
        className="mt-4 w-64 h-3 bg-gray-700 rounded-full" // Made bar slightly thicker
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.3 }} // Match interval speed roughly
        />
      </motion.div>

      <p className="mt-2 text-sm text-blue-300 pixel-font">{loadingProgress}%</p>

      {/* Removed the click interaction and related elements */}
      {/* Removed the "Start" button; onLoadComplete is triggered automatically */}

    </div>
  );
};