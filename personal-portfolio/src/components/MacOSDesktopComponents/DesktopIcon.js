import React from "react";
import { motion } from "framer-motion";

export const DesktopIcon = ({ icon: Icon, label, onClick }) => (
  <motion.div
    className="flex flex-col items-center cursor-pointer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <Icon size={48} className="text-white" />
    <span className="mt-2 text-white text-xs text-center">{label}</span>
  </motion.div>
);
