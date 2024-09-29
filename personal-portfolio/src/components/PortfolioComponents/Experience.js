import React from 'react';
import { motion } from 'framer-motion';

export const Experience = () => {
    const experiences = [
      {
        title: "Software Engineer",
        company: "OktoShop",
        period: "Aug 2024 – Present",
        description: "Engineered AI-powered chatbot API, implemented vector search capabilities, and optimized database operations for nutritional information retrieval."
      },
      {
        title: "Software Engineer",
        company: "MVP Studio",
        period: "Jan 2024 – July 2024",
        description: "Developed MVPs, constructed dashboard interfaces, and improved screen navigation efficiency by 15%."
      },
      {
        title: "AI Developer Intern",
        company: "Amaris.AI Pte Ltd",
        period: "Dec 2023 – Jan 2024",
        description: "Tested AI models, implemented advanced frameworks, and optimized model performance, reducing size by 30% and speeding up inference by 25%."
      },
      {
        title: "Software Engineer",
        company: "Any Technology Pte Ltd",
        period: "May 2023 – Aug 2023",
        description: "Enhanced company website, implemented security measures, and improved mobile user retention by 25%."
      }
    ];
  
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-900 min-h-screen py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Experience</h2>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg mb-6"
            >
              <h3 className="text-xl font-semibold text-blue-700">{exp.title} @ {exp.company}</h3>
              <p className="text-gray-600 mb-2">{exp.period}</p>
              <p className="text-gray-800">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };