import React from "react";
import { motion } from "motion/react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient py-20 px-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-10 md:p-16 shadow-xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            At Cravings, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Information Collection</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes your name, email address, phone number, and delivery address.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Use of Information</h2>
          <p>
            We use your information to fulfill orders, communicate with you, and improve our services. We do not sell your personal data to third parties.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
