import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn, slideIn, scaleIn } from "./AboutMeAnimations";
import mountainsImage from "../images/mountains.jpg";

export const AboutMe = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 text-white p-8">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center"
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={slideIn("left")}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <img
              src={mountainsImage}
              alt="Ho Kin Tat"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </motion.div>

          <motion.div
            variants={slideIn("right")}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            <p>
              Hello! I'm Ho Kin Tat, a passionate Computer Science student at
              NUS with a focus on AI and software engineering.
            </p>
            <p>
              I love building innovative solutions and exploring the latest
              technologies in machine learning and web development.
            </p>
            <p>
              When I'm not coding, you can find me going to the gym, playing basketball or going to view nature.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          variants={scaleIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-semibold mb-4">My Motto</h3>
          <blockquote className="text-xl italic">
            “I think a good friend, to me, is all about trust and loyalty. You
            don’t ever want to second-guess whether you can tell your friend
            something.” —Lauren Conrad
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
};
