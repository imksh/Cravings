import React from "react";
import { motion } from "motion/react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient py-20 px-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-10 md:p-16 shadow-xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            Welcome to Cravings. By accessing or using our platform, you agree to be bound by these Terms of Service.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Use of Service</h2>
          <p>
            Our service is designed to connect you with local restaurants for food delivery. You must provide accurate information when creating an account and placing orders.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Payments</h2>
          <p>
            All payments are processed securely. Prices are subject to change without notice. Refunds are subject to our cancellation policy.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. User Conduct</h2>
          <p>
            Users are expected to treat riders and restaurant partners with respect. Any abuse may result in account termination.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
