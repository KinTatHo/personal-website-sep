import React, { useState, useEffect } from "react";

export const TerminalContent = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Welcome to Kin Tat's Hacker Terminal",
  ]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const handleCommand = (e) => {
    e.preventDefault();
    setOutput([...output, `$ ${input}`]);
    processCommand(input);
    setInput("");
  };

  const processCommand = (cmd) => {
    switch (cmd.toLowerCase()) {
      case "help":
        setOutput((prev) => [
          ...prev,
          "Available commands: help, clear, level, hack",
        ]);
        break;
      case "clear":
        setOutput([]);
        break;
      case "level":
        setOutput((prev) => [
          ...prev,
          `Current level: ${level}, XP: ${xp}/100`,
        ]);
        break;
      case "hack":
        const gain = Math.floor(Math.random() * 20) + 10;
        setXp((prev) => Math.min(prev + gain, 100));
        setOutput((prev) => [
          ...prev,
          `Hacking successful! Gained ${gain} XP.`,
        ]);
        break;
      default:
        setOutput((prev) => [...prev, `Command '${cmd}' not recognized`]);
    }
  };

  useEffect(() => {
    if (xp >= 100) {
      setLevel((prev) => prev + 1);
      setXp(0);
      setOutput((prev) => [
        ...prev,
        `Level up! You are now level ${level + 1}`,
      ]);
    }
  }, [xp, level]);

  return (
    <div className="font-mono text-green-500 bg-black p-2 h-full">
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <form onSubmit={handleCommand} className="mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-green-500 w-full outline-none"
          placeholder="Enter command..."
        />
      </form>
    </div>
  );
};
