import React from 'react';
import { motion } from 'framer-motion';

export const Skills = () => {
  const skillCategories = [
    {
      category: "Languages",
      skills: [
        { name: "Java", level: 63 },
        { name: "Python", level: 85 },
        { name: "C/C++", level: 56 },
        { name: "JavaScript", level: 76 },
        { name: "HTML/CSS", level: 72 },
      ],
    },
    {
      category: "Frameworks",
      skills: [
        { name: "React", level: 85 },
        { name: "Node.js", level: 80 },
      ],
    },
    {
      category: "Developer Tools",
      skills: [
        { name: "Vim", level: 70 },
        { name: "Google Cloud Platform", level: 63 },
        { name: "VS Code", level: 90 },
        { name: "Jupyter Notebook", level: 80 },
        { name: "PyCharm", level: 80 },
        { name: "IntelliJ", level: 70 },
      ],
    },
    {
      category: "Libraries",
      skills: [
        { name: "Pandas", level: 62 },
        { name: "NumPy", level: 60 },
        { name: "PyTorch", level: 75 },
        { name: "Matplotlib", level: 69 },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16 px-8 bg-gradient-to-br from-blue-600 to-indigo-900">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-700">{category.category}</h3>
            <div className="space-y-3">
              {category.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-xs font-semibold text-blue-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.1 * idx, type: "spring", stiffness: 50 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
