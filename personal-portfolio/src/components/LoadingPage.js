import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardDrive, Zap, Play } from "lucide-react";

export const LoadingPage = ({ onLoadComplete }) => {
  const [power, setPower] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isFullyPowered, setIsFullyPowered] = useState(false);
  const maxPower = 100;
  const clicksNeeded = 10;

  useEffect(() => {
    if (power >= maxPower && !isFullyPowered) {
      setIsFullyPowered(true);
    }
  }, [power, isFullyPowered]);

  const handleClick = () => {
    if (clicks < clicksNeeded) {
      setClicks((prev) => prev + 1);
      setPower((prev) => Math.min(prev + 10, maxPower));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 500);
    }
  };

  const handleStart = () => {
    onLoadComplete();
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-20"
            initial={{ x: Math.random() * 100 + "%", y: "-10%", scale: 0 }}
            animate={{ y: "110%", scale: Math.random() * 2 + 1 }}
            transition={{
              duration: Math.random() * 2 + 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              width: "4px",
              height: "4px",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
      >
        <HardDrive size={100} className="text-blue-500" />
        <motion.div
          className="absolute inset-0 bg-blue-300 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: power / maxPower }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
        <Zap
          size={30}
          className="text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-2xl font-bold text-white"
      >
        {isFullyPowered ? "System Powered Up!" : "Power Up the System!"}
      </motion.h2>

      <motion.div
        className="mt-4 w-64 h-4 bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${(power / maxPower) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      </motion.div>

      <p className="mt-2 text-white">
        Power: {power}% | Clicks: {clicks}/{clicksNeeded}
      </p>

      <AnimatePresence>
        {showMessage && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 text-yellow-400 font-bold"
          >
            +10 Power!
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFullyPowered && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 px-6 py-3 bg-green-500 text-white rounded-full font-bold flex items-center"
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start <Play size={20} className="ml-2" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
