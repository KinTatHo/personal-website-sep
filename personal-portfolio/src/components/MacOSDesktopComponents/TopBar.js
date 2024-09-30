import React from "react";

export const TopBar = ({ time, batteryLevel, isCharging, handleCharge }) => (
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
);
