import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "../TypeWriterEffect";
import { Gamepad2, Code, Activity } from "lucide-react";
import { PixelBackground } from "../background/PixelBackground";

export const HomePage = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    if (score > 0 && score % 10 === 0) {
      setLevel((prevLevel) => prevLevel + 1);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  }, [score]);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <PixelBackground />

      <motion.div
        className="border-4 border-blue-500 p-8 rounded-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-blue-400 mb-4 pixel-font"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ho Kin Tat
        </motion.h1>
        <h2 className="text-2xl md:text-3xl text-blue-200 mb-8 pixel-font">
          I'm{" "}
          <TypewriterEffect
            words={[
              "a Software Engineer",
              "an AI Enthusiast",
              "a Problem Solver",
            ]}
            loop
          />
        </h2>
        <motion.p
          className="text-lg text-white max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Level {level} Developer on a quest to innovate and create amazing
          software!
        </motion.p>
        <div className="flex justify-center space-x-4 mb-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Gamepad2 size={40} className="text-green-400" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Code size={40} className="text-blue-400" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Activity size={40} className="text-orange-400" />
          </motion.div>
        </div>
        <motion.button
          className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 pixel-font"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={incrementScore}
        >
          Start Adventure! (Score: {score})
        </motion.button>
      </motion.div>

      {showAchievement && (
        <motion.div
          className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg pixel-font"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          Level Up! You're now Level {level}
        </motion.div>
      )}
    </div>
  );
};
