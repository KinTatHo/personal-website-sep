import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const TypewriterEffect = ({ words, loop = false }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    let timeout;
    if (currentText.length < words[currentWordIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText(words[currentWordIndex].slice(0, currentText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        controls.start({ opacity: 0 }).then(() => {
          setCurrentText('');
          setCurrentWordIndex((prevIndex) => 
            loop ? (prevIndex + 1) % words.length : Math.min(prevIndex + 1, words.length - 1)
          );
          controls.set({ opacity: 1 });
        });
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, words, loop, controls]);

  return (
    <motion.span animate={controls} initial={{ opacity: 1 }}>
      {currentText}
    </motion.span>
  );
};
