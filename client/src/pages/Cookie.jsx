import React from "react";
import { motion } from "motion/react";

const Cookie = () => {
  return (
    <div className="min-h-screen bg-gradient py-20 px-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-10 md:p-16 shadow-xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            This Cookie Policy explains how Cravings uses cookies and similar technologies to recognize you when you visit our website.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, as well as to provide reporting information.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How we use cookies</h2>
          <p>
            We use cookies to keep you signed in, remember your preferences, and analyze our traffic to improve your experience. We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device for a set period).
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Your Choices</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your browser.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Cookie;
