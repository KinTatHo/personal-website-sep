import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelBackground } from "../background/PixelBackground";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "GymBuddy",
      description:
        "Mobile application for gym goers to create and track workouts using OpenAI's GPT API.",
      tech: "Python, React Native, Javascript, Firebase, Jest",
      level: 3,
      xp: 750,
    },
    {
      title: "Offun",
      description:
        "Facebook-inspired web application for office personnel to post and communicate.",
      tech: "Python, Java, PostgreSQL",
      level: 2,
      xp: 500,
    },
    {
      title: "Hangar Telegram Bot",
      description: "Hotdesking telegram bot for NUS enterprise.",
      tech: "Python",
      level: 1,
      xp: 250,
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-800 to-purple-900 min-h-screen py-16 px-4 overflow-hidden">
      <PixelBackground />
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center text-white mt-5 pixel-font">
          Project Quests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-neon cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-xl font-semibold text-blue-400 pixel-font">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-2 pixel-font">
                Level {project.level} Quest
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(project.xp / 1000) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-400 pixel-font">XP: {project.xp}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 pixel-font">
                {selectedProject.title}
              </h3>
              <p className="text-gray-300 mb-4 pixel-font">
                {selectedProject.description}
              </p>
              <p className="text-gray-400 mb-2 pixel-font">Tech Stack:</p>
              <p className="text-blue-300 mb-4 pixel-font">
                {selectedProject.tech}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 pixel-font">
                  Level {selectedProject.level} Quest
                </span>
                <span className="text-blue-400 pixel-font">
                  XP: {selectedProject.xp}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
