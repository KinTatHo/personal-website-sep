import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Terminal, Mail, Coffee, Music } from "lucide-react";

export const MacOSDesktop = ({ onOpenWebsite, children }) => {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => Math.max(0, prev - 1));
    }, 10000); // Decrease battery every 10 seconds
    return () => clearInterval(batteryTimer);
  }, []);

  const handleCharge = () => {
    setIsCharging(true);
    const chargeInterval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (prev >= 100) {
          setIsCharging(false);
          clearInterval(chargeInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  };

  const openWindow = (name) => {
    if (!openWindows.includes(name)) {
      setOpenWindows([...openWindows, name]);
    }
  };

  const closeWindow = (name) => {
    setOpenWindows(openWindows.filter((window) => window !== name));
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-400 to-purple-500 p-8 relative overflow-hidden">
      {/* Desktop icons */}
      <div className="grid grid-cols-5 gap-4">
        <DesktopIcon
          icon={Folder}
          label="Kin Tat's Website"
          onClick={onOpenWebsite}
        />
        <DesktopIcon
          icon={Terminal}
          label="Terminal"
          onClick={() => openWindow("Terminal")}
        />
        <DesktopIcon
          icon={Mail}
          label="Mail"
          onClick={() => openWindow("Mail")}
        />
        <DesktopIcon
          icon={Coffee}
          label="Break Time"
          onClick={() => openWindow("Break")}
        />
        <DesktopIcon
          icon={Music}
          label="Spotify"
          onClick={() => openWindow("Spotify")}
        />
      </div>

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 flex justify-between items-center">
        <div>🍎 Kin Tat's MacBook</div>
        <div className="flex items-center space-x-4">
          <div>{time.toLocaleTimeString()}</div>
          <div
            className={`cursor-pointer ${
              isCharging
                ? "text-green-400"
                : batteryLevel < 20
                ? "text-red-400"
                : "text-white"
            }`}
            onClick={handleCharge}
          >
            🔋 {batteryLevel}%
          </div>
        </div>
      </div>

      {/* Open windows */}
      <AnimatePresence>
        {openWindows.map((window, index) => (
          <Window
            key={window}
            name={window}
            onClose={() => closeWindow(window)}
            zIndex={index}
          />
        ))}
      </AnimatePresence>

      {children}
    </div>
  );
};

const DesktopIcon = ({ icon: Icon, label, onClick }) => (
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

const Window = ({ name, onClose, zIndex }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    className="absolute top-20 left-20 w-64 h-48 bg-white rounded-lg shadow-lg overflow-hidden"
    style={{ zIndex }}
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  >
    <div className="bg-gray-200 p-2 flex justify-between items-center">
      <span>{name}</span>
      <button onClick={onClose} className="text-red-500 font-bold">
        ×
      </button>
    </div>
    <div className="p-4">
      <p>This is the {name} window content.</p>
    </div>
  </motion.div>
);
