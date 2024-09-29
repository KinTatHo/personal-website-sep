import React from 'react';
import { motion } from 'framer-motion';

export const Projects = () => {
    const projects = [
      {
        title: "GymBuddy",
        description: "Mobile application for gym goers to create and track workouts using OpenAI's GPT API.",
        tech: "Python, React Native, Javascript, Firebase, Jest"
      },
      {
        title: "Offun",
        description: "Facebook-inspired web application for office personnel to post and communicate.",
        tech: "Python, Java, PostgreSQL"
      },
      {
        title: "Hangar Telegram Bot",
        description: "Hotdesking telegram bot for NUS enterprise.",
        tech: "Python"
      }
    ];
  
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-900 min-h-screen py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg mb-6"
              >
                <h3 className="text-xl font-semibold text-blue-700">{project.title}</h3>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <p className="text-gray-800">Tech: {project.tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };