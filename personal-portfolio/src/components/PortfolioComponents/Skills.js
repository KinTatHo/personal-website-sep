import React, { useState } from "react"; // Removed useEffect as point generation is removed
import { motion, AnimatePresence } from "framer-motion";
import { Code, Terminal, Database, Cpu } from "lucide-react"; // Removed Lock, Unlock icons

export const Skills = () => {
  // Removed points state and related useEffect
  // Removed levelUpMessage state
  const [selectedSkill, setSelectedSkill] = useState(null); // Keep for displaying details on click

  // Simplified skill data: Removed 'unlocks', level represents proficiency (0-100)
  // You might want to adjust these levels/proficiency values
  const skillData = [
    {
      category: "Languages",
      icon: <Code size={24} />,
      skills: [
        { name: "Python", proficiency: 85 },
        { name: "JavaScript", proficiency: 76 },
        { name: "Java", proficiency: 63 },
        { name: "C/C++", proficiency: 56 },
      ],
    },
    {
      category: "Frameworks & Libraries", // Combined Frameworks & Libraries
      icon: <Terminal size={24} />,
      skills: [
        { name: "React", proficiency: 85 },
        { name: "Node.js", proficiency: 80 },
        { name: "PyTorch", proficiency: 75 },
        { name: "Pandas / NumPy", proficiency: 65 }, // Combined related libraries
      ],
    },
    {
      category: "Developer Tools",
      icon: <Cpu size={24} />,
      skills: [
        { name: "VS Code", proficiency: 90 },
        { name: "Git", proficiency: 85 },
        { name: "Docker", proficiency: 70 },
      ],
    },
    // Add more categories or skills as needed, e.g., Databases
    {
      category: "Databases",
      icon: <Database size={24} />,
      skills: [
        { name: "PostgreSQL", proficiency: 60 },
        { name: "Firebase", proficiency: 70 },
        // Add others like MongoDB, etc.
      ],
    },
  ];

  // Removed levelUpSkill function

  return (
    <div className="min-h-screen py-16 px-8 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Updated Title */}
      <h2 className="text-4xl font-bold mb-12 text-center pixel-font">
        Technical Skills
      </h2>
      <div className="max-w-6xl mx-auto">
        {/* Removed Points display and "Unlocked abilities" text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {skillData.map((category, index) => (
            <motion.div
              key={index}
              className="bg-blue-800 p-4 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center pixel-font">
                {category.icon}
                <span className="ml-2">{category.category}</span>
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-blue-700 p-3 rounded-lg cursor-pointer" // Increased padding slightly
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedSkill(skill)} // Still allows viewing details
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium pixel-font">
                        {skill.name}
                      </span>
                      {/* Removed Level display, proficiency shown by bar */}
                    </div>
                    {/* Progress bar now represents proficiency */}
                    <div className="w-full bg-blue-900 rounded-full h-2.5"> {/* Made bar slightly thicker */}
                      <motion.div
                        className="bg-yellow-400 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal/Detail View - kept for showing info, but removed leveling/unlocks */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedSkill(null)} // Close modal on background click
            >
              <motion.div
                className="bg-blue-800 p-6 rounded-xl shadow-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <h3 className="text-2xl font-semibold mb-4 pixel-font">
                  {selectedSkill.name}
                </h3>
                <div className="mb-4">
                  <span className="text-lg pixel-font mr-2">Proficiency:</span>
                  <div className="w-full bg-blue-900 rounded-full h-3 mt-1 inline-block align-middle" style={{ width: 'calc(100% - 120px)' }}>
                    <motion.div
                      className="bg-yellow-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.proficiency}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                   <span className="text-lg pixel-font ml-2">{selectedSkill.proficiency}%</span>
                </div>
                {/* Removed Level Up button */}
                {/* Removed Unlocks section */}
                {/* Add any other relevant details about the skill here if desired */}
                 <p className="text-sm pixel-font mt-4 text-gray-300">
                  {/* Example placeholder description */}
                  Experienced in utilizing {selectedSkill.name} for various projects.
                </p>
                <button 
                   onClick={() => setSelectedSkill(null)} 
                   className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-semibold pixel-font w-full"
                 >
                   Close
                 </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Removed level up message popup */}
    </div>
  );
};