import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn, slideIn, scaleIn } from "./AboutMeAnimations";
import { Lock, Unlock, Code, Bike, Mountain } from "lucide-react";
import { PixelBackground } from "./background/PixelBackground";
import mountainsImage from "../images/mountains.jpg";
import resume from "../resume/Ho_Kin_Tat_Resume.pdf";

export const AboutMe = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showAchievement, setShowAchievement] = useState(false);
  const [isResumeUnlocked, setIsResumeUnlocked] = useState(false);

  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      setLevel((prevLevel) => prevLevel + 1);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
    if (score >= 20 && !isResumeUnlocked) {
      setIsResumeUnlocked(true);
    }
  }, [score]);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="bg-gradient-to-br from-blue-800 to-purple-900 min-h-screen py-16 px-4 text-white">
      <PixelBackground />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center pixel-font"
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          About Me (Level {level})
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={slideIn("left")}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <img
              src={mountainsImage}
              alt="Profile"
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <motion.a
              href={isResumeUnlocked ? resume : "#"}
              download={isResumeUnlocked ? "Ho_Kin_Tat_Resume.pdf" : undefined}
              className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition-colors duration-300 ${
                isResumeUnlocked
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              whileHover={isResumeUnlocked ? { scale: 1.1 } : {}}
              whileTap={isResumeUnlocked ? { scale: 0.9 } : {}}
              onClick={(e) => {
                if (!isResumeUnlocked) {
                  e.preventDefault();
                  alert("Reach level 5 to unlock the resume!");
                } else {
                  incrementScore();
                }
              }}
            >
              {isResumeUnlocked ? (
                <Unlock size={24} className="text-white" />
              ) : (
                <Lock size={24} className="text-white" />
              )}
            </motion.a>
          </motion.div>

          <motion.div
            variants={slideIn("right")}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            <p className="pixel-font">
              Hello! I'm Ho Kin Tat, a passionate Computer Science student at
              NUS with a focus on AI and software engineering.
            </p>
            <p className="pixel-font">
              I love building innovative solutions and exploring the latest
              technologies in machine learning and web development.
            </p>
            <p className="pixel-font">
              When I'm not coding, you can find me going to the gym, playing
              basketball or going to view nature.
            </p>
            <div className="flex justify-around mt-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
                onClick={incrementScore}
              >
                <Code size={40} className="text-blue-400" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
                onClick={incrementScore}
              >
                <Bike size={40} className="text-orange-400" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
                onClick={incrementScore}
              >
                <Mountain size={40} className="text-green-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          variants={scaleIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-semibold mb-4 pixel-font">My Motto</h3>
          <blockquote className="text-xl italic pixel-font">
            "I think a good friend, to me, is all about trust and loyalty. You
            don't ever want to second-guess whether you can tell your friend
            something." —Lauren Conrad
          </blockquote>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="fixed top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg pixel-font"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            Level Up! You're now Level {level}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg pixel-font">
        Score: {score}
      </div>
    </div>
  );
};
