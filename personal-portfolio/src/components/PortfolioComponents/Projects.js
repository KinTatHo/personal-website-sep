import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelBackground } from "../background/PixelBackground"; // Keeping background for theme consistency

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Updated project data: Removed level and xp
  const projects = [
    {
      id: "gymbuddy", // Added simple id for key prop
      title: "GymBuddy",
      description:
        "Mobile application for gym goers to create and track workouts using OpenAI's GPT API, simplifying fitness routines.", // Slightly expanded description
      tech: "Python, React Native, Javascript, Firebase, OpenAI API, Jest", // Added OpenAI API
      imageUrl: "/images/gymbuddy-preview.png", // Example: Add optional image URL for preview
    },
    {
      id: "offun",
      title: "Offun",
      description:
        "Facebook-inspired web application designed for internal office communication and post sharing.",
      tech: "Python, Java, PostgreSQL, React", // Added React assuming it had a frontend
      imageUrl: "/images/offun-preview.png", // Example image URL
    },
    {
      id: "hangarbot",
      title: "Hangar Telegram Bot",
      description: "Efficient hot-desking Telegram bot developed for NUS Enterprise.",
      tech: "Python, Telegram Bot API", // Added Telegram Bot API
      imageUrl: "/images/hangarbot-preview.png", // Example image URL
    },
     // Add more projects here
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-800 to-purple-900 min-h-screen py-16 px-4 overflow-hidden">
      {/* PixelBackground remains for visual style */}
      <PixelBackground />
      <div className="container mx-auto relative z-10">
        {/* Updated title */}
        <h2 className="text-4xl font-bold mb-12 text-center text-white mt-5 pixel-font">
          Project Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id} // Use a unique id for the key
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-neon cursor-pointer flex flex-col justify-between" // Added flex classes
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 150, 255, 0.6)" }} // Enhanced hover effect
              onClick={() => setSelectedProject(project)}
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-400 pixel-font mb-2">
                  {project.title}
                </h3>
                 {/* Optional: Display a short version of description or primary tech */}
                 <p className="text-gray-400 text-sm pixel-font mb-4 line-clamp-2"> {/* Added line-clamp */}
                   {project.description}
                 </p>
              </div>
              {/* Removed Level and XP display */}
              {/* Example: Show primary tech */}
               <p className="text-xs text-gray-500 pixel-font mt-auto"> {/* mt-auto pushes tech to bottom */}
                 Tech: {project.tech.split(',').slice(0, 3).join(', ')}...
               </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" // Added padding
            onClick={() => setSelectedProject(null)} // Close on background click
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg max-w-lg w-full m-4 shadow-xl" // Added shadow
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 pixel-font">
                {selectedProject.title}
              </h3>
               {/* Optional: Display project image if available */}
              {selectedProject.imageUrl && (
                <img src={selectedProject.imageUrl} alt={`${selectedProject.title} preview`} className="rounded-md mb-4 w-full object-cover max-h-48"/>
              )}
              <p className="text-gray-300 mb-4 pixel-font">
                {selectedProject.description}
              </p>
              <p className="text-gray-400 mb-1 pixel-font font-semibold">Tech Stack:</p> {/* Made label bold */}
              <p className="text-blue-300 mb-6 pixel-font"> {/* Increased bottom margin */}
                {selectedProject.tech}
              </p>
              {/* Removed Level and XP display from modal */}
               <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold pixel-font w-full"
                >
                  Close
                </button>
                {/* Optional: Add link to live demo or repo */}
                {/*
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-center block mt-4 text-blue-400 hover:text-blue-300 pixel-font">
                  View Live Demo
                </a>
                */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};