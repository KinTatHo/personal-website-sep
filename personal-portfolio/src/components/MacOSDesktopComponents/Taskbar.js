import React from "react";
import { motion } from "framer-motion";
import { Folder, Terminal, Mail, Coffee, Music } from "lucide-react";

const iconMap = {
  "Kin Tat's Website": Folder,
  Terminal: Terminal,
  Mail: Mail,
  Break: Coffee,
  Spotify: Music,
};

export const Taskbar = ({ openWindows, minimizedWindows, onRestoreWindow }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-90 p-4 flex justify-center space-x-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {openWindows.map((window) => {
        const Icon = iconMap[window] || Folder;
        const isMinimized = minimizedWindows.includes(window);
        return (
          <motion.div
            key={window}
            className={`p-3 rounded-lg cursor-pointer ${
              isMinimized ? "bg-gray-600" : "bg-blue-500"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRestoreWindow(window)}
          >
            <Icon size={28} color="white" />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
