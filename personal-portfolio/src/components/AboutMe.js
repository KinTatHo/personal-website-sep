// components/AboutMe.js (With Custom Internal Animations)

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// We won't import from AboutMeAnimations.js for this version
// import { fadeIn, slideIn } from "./AboutMeAnimations"; 
import { Download, Code, Bike, Mountain, Brain } from "lucide-react"; 
import { ThreeBackground } from "./background/ThreeBackground";
import mountainsImage from "../images/mountains.jpg"; 
import resume from "../resume/Ho_Kin_Tat_Resume.pdf"; 

// --- Define Animation Variants Internally ---

// Stagger container for children elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Adjust stagger speed
      delayChildren: 0.3,   // Delay before children start
    },
  },
};

// Fade-in + slight slide-up for text elements
const textFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

// Slide-in from left for the image
const imageSlideIn = {
   hidden: { opacity: 0, x: -50 },
   visible: {
     opacity: 1,
     x: 0,
     transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } // Custom ease
   },
};

// Fade-in + slight scale for icons container
const iconsFadeScale = {
   hidden: { opacity: 0, scale: 0.9 },
   visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.4 } // Add delay relative to text
   }
};

// --- Component Starts ---

export const AboutMe = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.25, // Trigger slightly later if preferred
  });

  return (
    <div className="relative bg-gradient-to-br from-indigo-800 to-purple-900 min-h-screen py-20 px-4 text-white"> 
      <ThreeBackground />

      {/* Apply stagger container variants to the main content wrapper */}
      <motion.div 
        ref={ref} 
        variants={containerVariants} 
        initial="hidden"
        // Animate container (and children) when in view
        animate={inView ? "visible" : "hidden"} 
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.h2
           variants={textFadeUp} // Use textFadeUp variant for heading
           className="text-4xl font-bold mb-12 text-center pixel-font"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center"> 
          {/* Image Section */}
          <motion.div
            variants={imageSlideIn} // Use imageSlideIn variant
            className="relative md:col-span-2 order-1" 
          >
            <div className="relative aspect-square rounded-lg shadow-lg border-2 border-blue-500/50">
              <img
                src={mountainsImage} 
                alt="Profile Picture - Ho Kin Tat" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
               <motion.a
                 href={resume} 
                 download="Ho_Kin_Tat_Resume.pdf" 
                 className="absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-colors duration-300 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white z-20" 
                 whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 180, 180, 0.5)" }}
                 whileTap={{ scale: 0.95 }}
                 title="Download Resume" 
                 // Inherits animation from parent, or add a simple delayed fade:
                 initial={{ opacity: 0}} 
                 animate={{ opacity: 1}} 
                 transition={{delay: 0.8, duration: 0.5}} 
               >
                 <Download size={24} />
               </motion.a>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <div className="md:col-span-3 order-2 space-y-4"> 
            {/* Apply textFadeUp to each paragraph (staggered by parent) */}
            <motion.p variants={textFadeUp} className="pixel-font text-lg leading-relaxed">
              Hello! I'm Ho Kin Tat, a passionate Computer Science student at NUS specializing in AI and Software Engineering.
            </motion.p>
            <motion.p variants={textFadeUp} className="pixel-font text-lg leading-relaxed">
              I thrive on building innovative solutions, tackling complex problems, and exploring the latest advancements in machine learning and web development.
            </motion.p>
            <motion.p variants={textFadeUp} className="pixel-font text-lg leading-relaxed">
              Outside of technology, I enjoy staying active through gym workouts and basketball, and find balance by connecting with nature.
            </motion.p>
             
             {/* Apply iconsFadeScale to the icons container */}
            <motion.div 
              variants={iconsFadeScale} 
              className="flex justify-start space-x-6 pt-5" 
            >
              {/* Individual icon hover effects remain */}
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} title="Coding & Development"> 
                <Code size={36} className="text-blue-400 hover:text-blue-300 transition" />
              </motion.div>
               <motion.div whileHover={{ scale: 1.2, rotate: 5 }} title="AI & Machine Learning">
                 <Brain size={36} className="text-purple-400 hover:text-purple-300 transition" /> 
               </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} title="Cycling/Fitness">
                <Bike size={36} className="text-orange-400 hover:text-orange-300 transition" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} title="Nature & Outdoors">
                <Mountain size={36} className="text-green-400 hover:text-green-300 transition" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};