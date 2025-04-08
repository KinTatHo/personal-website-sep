import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Changed Gamepad2 to ChevronsDown, added PlusCircle as an alternative option
import { Activity, Code, ChevronsDown, PlusCircle, X } from "lucide-react"; 
import { PixelBackground } from "../background/PixelBackground";

export const Experience = () => {
  const [isFullExperienceOpen, setIsFullExperienceOpen] = useState(false);
  const topRef = useRef(null); // For scrolling to top when modal opens

  // Experience summary - kept as is, seems professional
  const overallSummary = [
    "Over 2 years of experience in software engineering and AI development",
    "Expertise in building high-performance APIs and implementing advanced search capabilities",
    "Strong background in developing MVPs and optimizing user interfaces",
    "Hands-on experience with emerging AI models and frameworks",
    "Proven track record of improving website performance and user engagement",
  ];

  // Detailed experiences - kept as is
  const fullExperiences = [
    {
      title: "Software Engineer",
      company: "Ok to Shop",
      period: "Aug 2024 – Present",
      summary:
        "Developed AI-powered chatbot API for nutritional information retrieval.",
      description:
        "Engineered a high-performance AI-powered chatbot API using FastAPI and Python, integrating OpenAI's GPT-3.5 for natural language processing to provide detailed nutritional information for over 100,000 products. Implemented advanced vector search capabilities with FAISS and Sentence Transformers, enabling efficient querying of a large product database for specific nutritional criteria.",
      icon: <Code className="text-blue-500" size={24} />,
    },
    {
      title: "Software Engineer",
      company: "MVP Studio",
      period: "Jan 2024 – July 2024",
      summary: "Built MVPs and optimized UI/UX for mobile applications.",
      description:
        "Developed Minimal Viable Products (MVPs) such as mobile applications, focusing on creating functional, market-ready prototypes. Constructed a dashboard interface and reusable UI components in React using material UI. Boosted screen navigation efficiency by 15% through UI/UX optimizations, enhancing user experience.",
       // Changed icon to Activity for variety, could use Briefcase too
      icon: <Activity className="text-green-500" size={24} />, 
    },
    {
      title: "AI Developer Intern",
      company: "Amaris.AI Pte Ltd",
      period: "Dec 2023 – Jan 2024",
      summary: "Tested and optimized AI models for speech-to-text systems.",
      description:
        "Conducted practical testing of emerging AI models, with an emphasis on their integration into user-focused products, including a speech-to-text system with speaker diarization capabilities. Collaborated with Data Scientists in the implementation of advanced AI frameworks such as Hugging Face Transformers and PyTorch. Enhanced AI model performance and efficiency through optimization techniques such as quantization, reducing model size by 30% and speeding up inference by 25% with minimal impact on accuracy.",
      icon: <Activity className="text-orange-500" size={24} />,
    },
    {
      title: "Software Engineer",
      company: "Any Technology Pte Ltd",
      period: "May 2023 – Aug 2023",
      summary:
        "Enhanced company website, improving traffic and user engagement.",
      description:
        "Played a key role in maintaining and enhancing the company's website using React, leading to a significant 30% increase in website traffic and user engagement. Handled critical data using encryption, which helped secure a major million-dollar contract deal with an Indonesian bank. Collaborated with the UX team to implement responsive design principles, resulting in a 25% improvement in mobile user retention.",
      icon: <Code className="text-purple-500" size={24} />,
    },
  ];

  const openFullExperience = () => {
    setIsFullExperienceOpen(true);
    // Scroll to top smoothly when modal opens
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); 
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-800 to-purple-900 min-h-screen py-16 px-4 text-white overflow-hidden">
      {/* Empty div at the top to scroll to */}
      <div ref={topRef} className="absolute top-0 left-0" /> 
      <div className="absolute inset-0 z-0">
        <PixelBackground />
      </div>
      <div className="container mx-auto relative z-10">
        {/* Updated title */}
        <h2 className="text-4xl font-bold mb-12 text-center text-white pixel-font">
          Professional Experience
        </h2>

        {/* Experience Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-neon mb-8"
        >
          <h3 className="text-2xl font-semibold mb-4 text-blue-400 pixel-font">
            Experience Overview
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {overallSummary.map((item, index) => (
              <li key={index} className="text-gray-300 pixel-font">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Individual Experience Summaries */}
        <div className="space-y-6">
          {fullExperiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // Added hover effect similar to Projects component
              className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-neon transition-all duration-300 hover:shadow-lg hover:bg-opacity-90" 
            >
              <div className="flex items-center mb-4">
                {exp.icon}
                <h3 className="text-xl font-semibold ml-3 text-blue-400 pixel-font"> {/* Added ml-3 */}
                  {exp.title} @ {exp.company}
                </h3>
              </div>
              <p className="text-gray-400 mb-2 pixel-font">{exp.period}</p>
              <p className="text-gray-300 pixel-font">{exp.summary}</p>
            </motion.div>
          ))}
        </div>

        {/* Button to open detailed view */}
        <motion.button // Changed from div to button for semantics
          className="cursor-pointer flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-lg shadow-lg mt-10 w-full md:w-auto md:mx-auto hover:from-blue-600 hover:to-teal-600" // Changed color, margin, width
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 180, 180, 0.5)"}} // Adjusted hover effect
          whileTap={{ scale: 0.95 }}
          onClick={openFullExperience}
        >
          {/* Changed icon */}
          <ChevronsDown className="mr-2" size={20} /> 
          {/* <PlusCircle className="mr-2" size={20} /> Use this icon as an alternative */}
          {/* Updated button text */}
          <span className="text-lg font-semibold pixel-font">
            View Detailed Experience
          </span>
        </motion.button>

        {/* Modal for Full Experience Details */}
        <AnimatePresence>
          {isFullExperienceOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // Added backdrop blur
              className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center p-4 z-50" 
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                // Added max width and height control
                className="bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative" 
              >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700"> {/* Added padding and border */}
                  {/* Updated modal title */}
                  <h3 className="text-2xl font-bold text-blue-400 pixel-font">
                    Detailed Experience
                  </h3>
                  <X // Close button
                    className="cursor-pointer text-gray-400 hover:text-gray-200"
                    size={28} // Made icon slightly larger
                    onClick={() => setIsFullExperienceOpen(false)}
                  />
                </div>
                {fullExperiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-6 border-b border-gray-800 pb-6 last:border-b-0 last:pb-0 last:mb-0" // Adjusted borders/padding
                  >
                    <div className="flex items-center mb-2">
                      {exp.icon}
                      <h4 className="text-xl font-semibold ml-3 text-blue-400 pixel-font"> {/* Added ml-3 */}
                        {exp.title} @ {exp.company}
                      </h4>
                    </div>
                    <p className="text-gray-400 mb-3 pixel-font"> {/* Increased bottom margin */}
                      {exp.period}
                    </p>
                    <p className="text-gray-300 pixel-font leading-relaxed"> {/* Added leading-relaxed */}
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
                 {/* Added explicit close button at the bottom */}
                 <button 
                    onClick={() => setIsFullExperienceOpen(false)} 
                    className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-semibold pixel-font block mx-auto"
                  >
                    Close
                  </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};