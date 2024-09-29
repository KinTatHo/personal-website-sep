import React from 'react';
import { motion } from 'framer-motion';
import { HardDrive } from 'lucide-react';

export const LoadingPage = ({ onLoadComplete }) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 1.5, times: [0, 0.8, 1] }}
        onAnimationComplete={onLoadComplete}
      >
        <HardDrive size={100} className="text-blue-500" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-2xl font-bold text-white"
      >
        Loading Portfolio...
      </motion.h2>
    </div>
  );
};
