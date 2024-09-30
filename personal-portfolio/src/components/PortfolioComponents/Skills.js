import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Terminal, Database, Cpu, Lock, Unlock } from "lucide-react";

export const Skills = () => {
  const [points, setPoints] = useState(100);
  const [levelUpMessage, setLevelUpMessage] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillTree = [
    {
      category: "Languages",
      icon: <Code size={24} />,
      skills: [
        {
          name: "Python",
          level: 85,
          unlocks: ["Machine Learning", "Data Analysis"],
        },
        { name: "JS", level: 76, unlocks: ["Web Development"] },
        { name: "Java", level: 63, unlocks: ["Android Development"] },
        { name: "C/C++", level: 56, unlocks: ["System Programming"] },
      ],
    },
    {
      category: "Frameworks",
      icon: <Terminal size={24} />,
      skills: [
        { name: "React", level: 85, unlocks: ["Advanced UI"] },
        { name: "Node.js", level: 80, unlocks: ["Backend Development"] },
      ],
    },
    {
      category: "Developer Tools",
      icon: <Cpu size={24} />,
      skills: [
        { name: "VS Code", level: 90, unlocks: ["Efficient Coding"] },
        { name: "Git", level: 85, unlocks: ["Version Control Mastery"] },
        { name: "Docker", level: 70, unlocks: ["Containerization"] },
      ],
    },
    {
      category: "Libraries",
      icon: <Database size={24} />,
      skills: [
        { name: "PyTorch", level: 75, unlocks: ["Deep Learning"] },
        { name: "Pandas", level: 62, unlocks: ["Data Manipulation"] },
        { name: "NumPy", level: 60, unlocks: ["Numerical Computing"] },
      ],
    },
  ];

  const levelUpSkill = (skill) => {
    if (points > 0 && skill.level < 100) {
      setPoints((prevPoints) => prevPoints - 1);
      skill.level += 1;

      if (skill.level % 10 === 0) {
        setLevelUpMessage(`${skill.name} reached level ${skill.level}!`);
        setTimeout(() => setLevelUpMessage(null), 3000);
      }
      setSelectedSkill({ ...skill });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-16 px-8 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <h2 className="text-4xl font-bold mb-12 text-center pixel-font">
        Skill Tree Adventure
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-semibold pixel-font">
            Points: {points}
          </div>
          <div className="text-lg pixel-font">Unlocked abilities!</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {skillTree.map((category, index) => (
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
                    className="bg-blue-700 p-2 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium pixel-font">
                        {skill.name}
                      </span>
                      <span className="text-xs font-semibold text-yellow-400 pixel-font">
                        Lv. {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-blue-900 rounded-full h-2 mt-1">
                      <motion.div
                        className="bg-yellow-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 pixel-font">
                {selectedSkill.name}
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg pixel-font">
                  Level: {selectedSkill.level}
                </span>
                <button
                  className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold pixel-font"
                  onClick={() => levelUpSkill(selectedSkill)}
                >
                  Level Up (1 point)
                </button>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 pixel-font">
                  Unlocks:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.unlocks.map((unlock, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-700 px-3 py-1 rounded-full"
                    >
                      {selectedSkill.level >= 50 ? (
                        <Unlock size={16} className="mr-1" />
                      ) : (
                        <Lock size={16} className="mr-1" />
                      )}
                      <span className="text-sm pixel-font">{unlock}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm pixel-font">
                Mastering {selectedSkill.name} allows you to tackle more complex
                projects and unlock new possibilities in your development
                journey.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {levelUpMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-8 right-8 bg-yellow-400 text-blue-900 p-4 rounded-lg shadow-lg pixel-font"
          >
            {levelUpMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
