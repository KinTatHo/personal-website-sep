import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Folder, Terminal, Mail, Coffee, Music } from "lucide-react";
import { DesktopIcon } from "./DesktopIcon";
import { TopBar } from "./TopBar";
import { WindowManager } from "./WindowManager";
import { Taskbar } from "./Taskbar";

export const MacOSDesktop = ({ onOpenWebsite, children }) => {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [wallpaperTime, setWallpaperTime] = useState("day");

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      setWallpaperTime(
        newTime.getHours() >= 6 && newTime.getHours() < 18 ? "day" : "night"
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => Math.max(0, prev - 1));
    }, 10000);
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
    setMinimizedWindows(minimizedWindows.filter((window) => window !== name));
  };

  const closeWindow = (name) => {
    setOpenWindows(openWindows.filter((window) => window !== name));
    setMinimizedWindows(minimizedWindows.filter((window) => window !== name));
  };

  const minimizeWindow = (name) => {
    if (!minimizedWindows.includes(name)) {
      setMinimizedWindows([...minimizedWindows, name]);
    }
  };

  const restoreWindow = (name) => {
    setMinimizedWindows(minimizedWindows.filter((window) => window !== name));
  };

  return (
    <div className={`h-screen w-screen bg-gradient-to-br ${
      wallpaperTime === "day"
        ? "from-blue-400 to-purple-500"
        : "from-indigo-900 to-purple-900"
    } relative overflow-hidden flex flex-col`}>
      <TopBar 
        time={time} 
        batteryLevel={batteryLevel} 
        isCharging={isCharging} 
        onCharge={handleCharge}
      />

      <div className="flex-grow relative">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute"
            animate={{
              x: ["0%", "80%", "20%", "100%", "0%"],
              y: ["0%", "80%", "20%", "100%", "0%"],
            }}
            transition={{
              x: { duration: 30, repeat: Infinity, repeatType: "reverse" },
              y: { duration: 35, repeat: Infinity, repeatType: "reverse" },
            }}
          >
            <img 
              src="https://media2.giphy.com/media/82rEYzUgZbgQM/giphy.gif" 
              alt="Thor" 
              className="w-auto h-40 object-contain"
            />
          </motion.div>
        </div>

        {/* Desktop Icons */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="grid grid-cols-5 gap-12 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        </div>

        <WindowManager 
          openWindows={openWindows}
          minimizedWindows={minimizedWindows}
          closeWindow={closeWindow}
          minimizeWindow={minimizeWindow}
        />

        {children}
      </div>

      <div className="z-50">
        <Taskbar 
          openWindows={openWindows}
          minimizedWindows={minimizedWindows}
          onRestoreWindow={restoreWindow}
        />
      </div>
    </div>
  );
};
