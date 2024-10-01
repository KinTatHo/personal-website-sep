import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Minimize, Maximize } from "lucide-react";

export const Window = ({
  name,
  onClose,
  zIndex,
  content,
  isMinimized,
  onMinimize,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: isMinimized ? 0.1 : 1,
        x: isMinimized ? "calc(100vw - 60px)" : 0,
        y: isMinimized ? `calc(100vh - ${60 + zIndex * 40}px)` : 0,
        width: isMaximized ? "calc(100vw - 40px)" : "400px",
        height: isMaximized ? "calc(100vh - 80px)" : "300px",
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: isMaximized ? "40px" : "60px",
        left: isMaximized ? "20px" : "60px",
        zIndex,
      }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="bg-gray-200 p-2 flex justify-between items-center">
        <span>{name}</span>
        <div className="flex space-x-2">
          <button
            onClick={onMinimize}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <Minimize size={16} />
          </button>
          <button
            onClick={toggleMaximize}
            className="text-green-500 hover:text-green-600"
          >
            <Maximize size={16} />
          </button>
          <button onClick={onClose} className="text-red-500 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="p-4 h-full overflow-auto">{content}</div>
      )}
    </motion.div>
  );
};
