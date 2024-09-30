import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, Mail, MapPin, Star, X } from "lucide-react";
import emailjs from "@emailjs/browser";

export const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formProgress, setFormProgress] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const form = useRef();

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    updateProgress(newFormData);
  };

  const updateProgress = (data) => {
    let progress = 0;
    if (data.name) progress += 33;
    if (data.email) progress += 33;
    if (data.message) progress += 34;
    setFormProgress(progress);

    // Check for achievements
    if (progress === 100 && !achievements.includes("Form Completed")) {
      setAchievements([...achievements, "Form Completed"]);
    }
    if (data.message.length > 100 && !achievements.includes("Long Message")) {
      setAchievements([...achievements, "Long Message"]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zbtg7cn",
        "template_h1w6vs6",
        form.current,
        "05Ig1ioRQA1Lk7UbI"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          setAchievements([...achievements, "Message Sent"]);
          setShowSuccessPopup(true);
          setFormData({ name: "", email: "", message: "" });
          setFormProgress(0);
          setTimeout(() => setShowSuccessPopup(false), 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 text-white p-8">
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center mt-5 pixel-font">
          Contact Quest
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4 pixel-font">
              Complete Your Mission
            </h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 pixel-font">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-blue-700 text-white placeholder-blue-300 pixel-font"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 pixel-font">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-blue-700 text-white placeholder-blue-300 pixel-font"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 pixel-font">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-2 rounded bg-blue-700 text-white placeholder-blue-300 pixel-font"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="mb-4">
                <div className="w-full bg-blue-900 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${formProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1 pixel-font">
                  Mission Progress: {formProgress}%
                </p>
              </div>
              <motion.button
                type="submit"
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold flex items-center justify-center w-full md:w-auto pixel-font"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message <Send className="ml-2" size={18} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4 pixel-font">
              Contact Information
            </h3>
            <div className="flex items-center">
              <Phone className="mr-4" size={24} />
              <span className="pixel-font">+65 92232010</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-4" size={24} />
              <span className="pixel-font">kintath@gmail.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-4" size={24} />
              <span className="pixel-font">Singapore</span>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-2 pixel-font">
                Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-yellow-500 text-black px-3 py-1 rounded-full flex items-center pixel-font"
                  >
                    <Star size={16} className="mr-1" />
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg pixel-font"
          >
            <div className="flex items-center">
              <span>Message sent successfully!</span>
              <X
                className="ml-2 cursor-pointer"
                onClick={() => setShowSuccessPopup(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
