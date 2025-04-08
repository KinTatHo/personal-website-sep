// components/PortfolioComponents/Experience.js (Timeline Layout)

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Code, Briefcase, GraduationCap, X } from "lucide-react"; // Added Briefcase, GraduationCap
import { ThreeBackground } from "../background/ThreeBackground"; // Assuming usage

// Define icons for different experience types (add more as needed)
const iconMap = {
  "Software Engineer": Briefcase,
  "AI Developer Intern": Code,
  // Add entries for education, etc.
  "Education": GraduationCap, 
  "Default": Activity
};

export const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const topRef = useRef(null); // For modal scroll
  const timelineData = [
     {
      id: "oktoshop",
      type: "Software Engineer",
      title: "Software Engineer",
      company: "Ok to Shop",
      period: "Aug 2024 – Present",
      summary: "Developed AI-powered chatbot API.",
      description: "Engineered a high-performance AI-powered chatbot API using FastAPI and Python, integrating OpenAI's GPT-3.5... Implemented advanced vector search capabilities with FAISS...",
    },
    {
      id: "mvpstudio",
      type: "Software Engineer",
      title: "Software Engineer",
      company: "MVP Studio",
      period: "Jan 2024 – July 2024",
      summary: "Built MVPs and optimized UI/UX.",
      description: "Developed Minimal Viable Products (MVPs) such as mobile applications... Constructed a dashboard interface... Boosted screen navigation efficiency by 15%...",
    },
     {
      id: "amarisai",
      type: "AI Developer Intern",
      title: "AI Developer Intern",
      company: "Amaris.AI Pte Ltd",
      period: "Dec 2023 – Jan 2024",
      summary: "Tested and optimized AI models.",
      description: "Conducted practical testing of emerging AI models... Collaborated with Data Scientists... Enhanced AI model performance and efficiency through optimization techniques...",
    },
    // Example: Add Education Item
     {
      id: "anytech",
      type: "Software Engineer",
      title: "Software Engineer",
      company: "Any Technology Pte Ltd",
      period: "May 2023 – Aug 2023",
      summary: "Enhanced company website.",
      description: "Played a key role in maintaining and enhancing the company's website using React... Handled critical data using encryption... Collaborated with the UX team...",
    },
  ].sort((a, b) => new Date(b.period.split('–')[0].trim()) - new Date(a.period.split('–')[0].trim())); // Sort by start date descending (most recent first)


  const openModal = (exp) => {
    setSelectedExperience(exp);
    // Scroll modal content to top if needed (optional)
    // setTimeout(() => { topRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100); 
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen py-20 px-4 text-white overflow-hidden">
      <ThreeBackground />
      <div ref={topRef} className="absolute top-0 left-0" /> {/* Scroll target */}
      <div className="container mx-auto relative z-10 max-w-3xl"> {/* Constrained width */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16 text-center pixel-font" // Increased bottom margin
        >
          Professional Experience
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-teal-500/30 to-purple-500/30 rounded-full transform -translate-x-1/2"></div>

          {timelineData.map((exp, index) => {
            const IconComponent = iconMap[exp.type] || iconMap["Default"];
            const isLeft = index % 2 === 0; // Alternate sides on larger screens

            return (
              <motion.div
                key={exp.id}
                className={`relative mb-12 flex items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} md:justify-between w-full`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                viewport={{ once: true, amount: 0.3 }} // Trigger animation sooner
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                {/* Icon and Dot on the line */}
                 <div className={`absolute left-6 md:left-1/2 top-1 w-12 h-12 rounded-full bg-gray-800 border-2 border-blue-400 flex items-center justify-center z-10 transform -translate-x-1/2 ${isLeft ? 'md:translate-x-0 md:-ml-6' : 'md:-translate-x-0 md:-mr-6'}`}>
                   <IconComponent className="w-6 h-6 text-teal-400" />
                 </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] p-5 rounded-lg bg-gray-800/70 backdrop-blur-md border border-gray-700/50 shadow-lg cursor-pointer transition-shadow hover:shadow-blue-500/30 ml-12 md:ml-0`} // Added margin-left for mobile
                   onClick={() => openModal(exp)}
                >
                  <p className="text-sm text-teal-400 mb-1 pixel-font">{exp.period}</p>
                  <h3 className="text-lg font-semibold text-blue-300 mb-1 pixel-font">{exp.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-300 leading-snug">{exp.summary}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal for Full Details (Keep previous modal structure, just pass selectedExperience) */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex justify-center items-center p-4 z-50" 
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-700" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                    <div >
                       <h3 className="text-xl md:text-2xl font-bold text-blue-300 pixel-font">{selectedExperience.title}</h3>
                       <p className="text-sm text-gray-400">{selectedExperience.company}</p>
                    </div>
                  <button onClick={() => setSelectedExperience(null)} className="text-gray-400 hover:text-white transition-colors">
                    <X size={28} />
                  </button>
                </div>
                 <p className="text-sm text-teal-400 mb-4 pixel-font">{selectedExperience.period}</p>
                 <p className="text-gray-300 leading-relaxed">{selectedExperience.description}</p>
                 {/* Optional: Add close button at bottom if preferred */}
                 <button onClick={() => setSelectedExperience(null)} className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-semibold pixel-font block ml-auto">Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};