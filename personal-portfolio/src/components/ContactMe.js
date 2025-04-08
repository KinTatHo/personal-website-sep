import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Removed Star icon as achievements are removed
import { Send, Phone, Mail, MapPin, X } from "lucide-react"; 
import emailjs from "@emailjs/browser";

export const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formProgress, setFormProgress] = useState(0);
  // Removed achievements state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    updateProgress(newFormData); // Update progress bar based on filled fields
  };

  // Simplified progress update: just calculates percentage based on filled fields
  const updateProgress = (data) => {
    let progress = 0;
    const totalFields = 3;
    if (data.name.trim()) progress++;
    if (data.email.trim()) progress++; // Basic check for non-empty email
    if (data.message.trim()) progress++;
    
    setFormProgress(Math.round((progress / totalFields) * 100));
    
    // Removed achievement checking logic
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: Add more robust form validation here if needed

    emailjs
      .sendForm(
        "service_zbtg7cn", // Replace with your EmailJS service ID
        "template_h1w6vs6", // Replace with your EmailJS template ID
        form.current,
        "05Ig1ioRQA1Lk7UbI" // Replace with your EmailJS public key
      )
      .then(
        () => {
          console.log("SUCCESS!");
          // Removed achievement setting
          setShowSuccessPopup(true);
          // Reset form after successful submission
          setFormData({ name: "", email: "", message: "" });
          setFormProgress(0); 
          // Hide popup after 3 seconds
          setTimeout(() => setShowSuccessPopup(false), 3000); 
        },
        (error) => {
          console.log("FAILED...", error.text);
          // Optional: Show an error message to the user here
        }
      );
  };

  return (
    // Using a slightly different gradient for variety, adjust as needed
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900 text-white p-8"> 
      <div className="max-w-4xl w-full mx-auto">
        {/* Updated Title */}
        <h2 className="text-4xl font-bold mb-10 text-center mt-5 pixel-font"> 
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> {/* Increased gap */}
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Updated Subtitle */}
            <h3 className="text-2xl font-semibold mb-6 pixel-font"> 
              Send Me a Message
            </h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-5"> {/* Increased spacing */}
              <div>
                <label htmlFor="name" className="block mb-2 pixel-font text-sm"> {/* Adjusted margin and size */}
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  // Adjusted input styling
                  className="w-full p-3 rounded bg-indigo-700 text-white placeholder-indigo-300 pixel-font border border-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 pixel-font text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded bg-indigo-700 text-white placeholder-indigo-300 pixel-font border border-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="your.email@example.com" // Updated placeholder
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 pixel-font text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5" // Slightly taller textarea
                  className="w-full p-3 rounded bg-indigo-700 text-white placeholder-indigo-300 pixel-font border border-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              {/* Progress Bar */}
              <div className="pt-2"> {/* Added padding top */}
                <div className="w-full bg-indigo-900 rounded-full h-2.5">
                  <motion.div // Added animation to progress bar fill
                    className="bg-blue-500 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {/* Updated Progress Text */}
                <p className="text-sm mt-2 pixel-font text-indigo-300"> 
                  Completion Progress: {formProgress}%
                </p>
              </div>
              {/* Submit Button */}
              <motion.button
                type="submit"
                 // Adjusted button styling
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center w-full md:w-auto pixel-font shadow-lg hover:from-blue-600 hover:to-teal-600"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 180, 180, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message <Send className="ml-2" size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 pt-10 md:pt-0" // Added padding top for mobile
          >
            <h3 className="text-2xl font-semibold mb-6 pixel-font"> 
              Contact Information
            </h3>
            {/* Kept contact info as is, looks professional */}
            <div className="flex items-center group"> {/* Added group for hover effects */}
              <Phone className="mr-4 text-blue-400 group-hover:text-blue-300 transition" size={24} />
              <span className="pixel-font group-hover:text-gray-200 transition">+65 92232010</span>
            </div>
            <div className="flex items-center group">
              <Mail className="mr-4 text-blue-400 group-hover:text-blue-300 transition" size={24} />
              <span className="pixel-font group-hover:text-gray-200 transition">kintath@gmail.com</span>
            </div>
            <div className="flex items-center group">
              <MapPin className="mr-4 text-blue-400 group-hover:text-blue-300 transition" size={24} />
              <span className="pixel-font group-hover:text-gray-200 transition">Singapore</span>
            </div>
            
            {/* Removed Achievements section */}
            
          </motion.div>
        </div>
      </div>

      {/* Success Popup - Kept functionality, adjusted styling */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }} // Changed exit animation
            className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg shadow-xl pixel-font flex items-center" // Enhanced styling
          >
            <span className="mr-3">Message sent successfully!</span> {/* Added margin */}
            <X
              className="cursor-pointer hover:text-gray-200 transition" // Added hover effect
              onClick={() => setShowSuccessPopup(false)}
              size={20} // Adjusted size
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};