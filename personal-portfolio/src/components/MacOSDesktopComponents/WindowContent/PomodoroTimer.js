import React, { useState, useEffect } from "react";

export const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setPomodorosCompleted((prev) => prev + 1);
      alert("Pomodoro completed! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Timer</h2>
      <div className="text-4xl font-mono mb-4">{formatTime(time)}</div>
      <div className="space-x-2 mb-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
      <div className="text-xl">Pomodoros Completed: {pomodorosCompleted}</div>
    </div>
  );
};
