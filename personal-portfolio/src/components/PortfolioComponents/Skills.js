// components/PortfolioComponents/Skills.js (Revamped Layout)

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Import necessary icons
import { Code, Terminal, Database, Cpu, X, Star, Circle } from "lucide-react"; 

// Example: Map skill names to specific icons (optional, extend as needed)
const skillIconMap = {
  "Python": Code, // Reusing category icons for simplicity, can be changed
  "JavaScript": Code,
  "Java": Code,
  "C/C++": Code,
  "React": Terminal,
  "Node.js": Terminal,
  "PyTorch": Cpu, // Example different icon
  "Pandas / NumPy": Database,
  "VS Code": Cpu,
  "Git": Code, // Example different icon
  "Docker": Cpu,
  "PostgreSQL": Database,
  "Firebase": Database,
};

// Animation for category sections
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// Animation for individual skill items
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
};

// Helper component for Proficiency Dots
const ProficiencyDots = ({ proficiency }) => {
  const totalDots = 5; // Display proficiency out of 5 dots
  const filledDots = Math.round((proficiency / 100) * totalDots);
  return (
    <div className="flex space-x-1">
      {[...Array(totalDots)].map((_, i) => (
        <Circle
          key={i}
          size={10} // Size of dots
          className={i < filledDots ? "fill-teal-400 text-teal-400" : "fill-gray-600 text-gray-600"}
        />
      ))}
    </div>
  );
};


export const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Skill data structure (using proficiency 0-100)
  const skillData = [
     {
      category: "Languages",
      icon: <Code size={28} className="text-blue-400" />, 
      skills: [
        { name: "Python", proficiency: 85, iconName: "Python" }, 
        { name: "JavaScript", proficiency: 76, iconName: "JavaScript" },
        { name: "Java", proficiency: 63, iconName: "Java" },
        { name: "C/C++", proficiency: 56, iconName: "C/C++" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      icon: <Terminal size={28} className="text-green-400" />,
      skills: [
        { name: "React", proficiency: 85, iconName: "React" },
        { name: "Node.js", proficiency: 80, iconName: "Node.js" },
        { name: "PyTorch", proficiency: 75, iconName: "PyTorch" },
        { name: "Pandas / NumPy", proficiency: 65, iconName: "Pandas / NumPy" }, 
      ],
    },
    {
      category: "Developer Tools & Platforms", // Combined category
      icon: <Cpu size={28} className="text-orange-400" />,
      skills: [
        { name: "VS Code", proficiency: 90, iconName: "VS Code" },
        { name: "Git", proficiency: 85, iconName: "Git" },
        { name: "Docker", proficiency: 70, iconName: "Docker" },
        { name: "Linux", proficiency: 75, iconName: "Linux"}, // Added Linux
      ],
    },
    {
      category: "Databases",
      icon: <Database size={28} className="text-purple-400" />,
      skills: [
        { name: "PostgreSQL", proficiency: 60, iconName: "PostgreSQL" },
        { name: "Firebase", proficiency: 70, iconName: "Firebase" },
      ],
    },
  ];

  const getSkillIcon = (iconName) => {
    return skillIconMap[iconName] || Star; // Fallback to Star
};

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-16 text-center pixel-font text-gray-100"> 
        Technical Skills
      </h2>
      <div className="max-w-5xl mx-auto space-y-12"> 
        {skillData.map((category) => (
          <motion.section 
            key={category.category}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              variants={itemVariants} 
              className="flex items-center mb-6 border-b-2 border-gray-700 pb-3"
            >
              <span className="mr-3">{category.icon}</span>
              <h3 className="text-2xl font-semibold pixel-font text-gray-200">
                {category.category}
              </h3>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
              {category.skills.map((skill) => {
                 const SkillIcon = getSkillIcon(skill.iconName); // Use helper function
                 return (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants} 
                    className="bg-gray-800/50 border border-gray-700/60 rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-700/70 hover:shadow-lg hover:border-teal-500/50 group" 
                    onClick={() => setSelectedSkill(skill)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    title={`View details for ${skill.name}`} 
                  >
                    <div className="flex items-center overflow-hidden mr-2"> {/* Added overflow-hidden, mr-2 */}
                      <SkillIcon size={20} className="mr-2 text-teal-400 transition-colors group-hover:text-teal-300 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                      <span className="text-sm sm:text-base font-medium pixel-font text-gray-200 group-hover:text-white transition-colors truncate"> {/* Added truncate, adjusted size */}
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex-shrink-0"> {/* Prevent dots from shrinking */}
                        <ProficiencyDots proficiency={skill.proficiency} /> 
                    </div>
                  </motion.div>
                 );
              })}
            </div>
          </motion.section>
        ))}

        {/* Modal */}
        <AnimatePresence>
          {selectedSkill && (() => {
            // Get the Icon component safely *before* rendering
            const ModalIcon = getSkillIcon(selectedSkill.iconName); 
            return (
             <motion.div
               key="skillModal" // Added key for AnimatePresence
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center p-4 z-50" 
               onClick={() => setSelectedSkill(null)} 
             >
               <motion.div
                 className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full border border-gray-700" 
                 onClick={(e) => e.stopPropagation()} 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.8, opacity: 0 }}
                 transition={{ type: "spring", damping: 15, stiffness: 200 }} 
               >
                  {/* Modal Header */}
                  <motion.div 
                     initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} // Added animation
                     className="flex justify-between items-center mb-5 pb-3 border-b border-gray-600"
                  >
                     <div className="flex items-center">
                        {/* Render the safe ModalIcon component */}
                        <ModalIcon size={24} className="mr-3 text-teal-400" /> 
                        <h3 className="text-2xl font-semibold pixel-font text-gray-100">
                          {selectedSkill.name}
                        </h3>
                     </div>
                     <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-white transition-colors">
                         <X size={24} />
                     </button>
                  </motion.div>
                  
                  {/* Modal Body */}
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}> 
                      <div className="mb-6">
                         <label className="text-sm pixel-font text-gray-400 block mb-2">Proficiency:</label> 
                         <div className="flex items-center justify-between">
                           <ProficiencyDots proficiency={selectedSkill.proficiency} />
                           <span className="text-lg font-semibold pixel-font text-yellow-400/90">{selectedSkill.proficiency}%</span>
                         </div>
                      </div>
                       
                      <p className="text-sm pixel-font text-gray-300 leading-relaxed">
                       {/* Add specific descriptions to skillData if possible */}
                       Demonstrated proficiency in {selectedSkill.name} across multiple projects, focusing on [mention specific area like 'efficient algorithms', 'API development', 'data analysis', etc.].
                     </p>
                  </motion.div>

               </motion.div>
             </motion.div>
           )})}
        </AnimatePresence>
      </div>
    </div>
  );
};