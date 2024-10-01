import React from "react";
import { AnimatePresence } from "framer-motion";
import { Window } from "./Window";
import { TerminalContent } from "./WindowContent/TerminalContent";
import { MailContent } from "./WindowContent/MailContent";
import { PomodoroTimer } from "./WindowContent/PomodoroTimer";
import { SpotifyPlayer } from "./WindowContent/SpotifyPlayer";

export const WindowManager = ({
  openWindows,
  minimizedWindows,
  closeWindow,
  minimizeWindow,
}) => (
  <AnimatePresence>
    {openWindows.map((window, index) => (
      <Window
        key={window}
        name={window}
        onClose={() => closeWindow(window)}
        onMinimize={() => minimizeWindow(window)}
        zIndex={openWindows.length - index}
        isMinimized={minimizedWindows.includes(window)}
        content={
          window === "Terminal" ? (
            <TerminalContent />
          ) : window === "Mail" ? (
            <MailContent />
          ) : window === "Break" ? (
            <PomodoroTimer />
          ) : window === "Spotify" ? (
            <SpotifyPlayer />
          ) : (
            <p>This is the {window} window content.</p>
          )
        }
      />
    ))}
  </AnimatePresence>
);
