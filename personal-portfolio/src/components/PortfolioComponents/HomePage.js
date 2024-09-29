import React from 'react';
import { motion } from 'framer-motion';
import { TypewriterEffect } from '../TypeWriterEffect';

export const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Ho Kin Tat
      </motion.h1>
      <h2 className="text-2xl md:text-3xl text-blue-200 mb-8">
        I'm <TypewriterEffect words={['a Software Engineer', 'an AI Enthusiast', 'a Problem Solver']} loop />
      </h2>
      <motion.p
        className="text-lg text-white max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        I'm a Computer Science student at NUS, passionate about AI and software engineering. 
        Let's build innovative solutions together!
      </motion.p>
      <motion.button
        className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        View My Work
      </motion.button>
    </div>
  );
};
