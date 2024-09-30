import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Minimize, Maximize } from "lucide-react";

export const Window = ({ name, onClose, zIndex, content }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: isMinimized ? 0 : 1 }}
      exit={{ scale: 0 }}
      className="absolute top-20 left-20 w-96 bg-white rounded-lg shadow-lg overflow-hidden"
      style={{ zIndex, height: isMinimized ? "40px" : "300px" }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <div className="bg-gray-200 p-2 flex justify-between items-center">
        <span>{name}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-yellow-500"
          >
            <Minimize size={16} />
          </button>
          <button className="text-green-500">
            <Maximize size={16} />
          </button>
          <button onClick={onClose} className="text-red-500">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="p-4 h-full overflow-auto">{content}</div>
    </motion.div>
  );
};
