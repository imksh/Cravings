import React from "react";
import { motion } from "motion/react";

const Promo = () => {
  return (
    <div className="min-h-screen bg-gradient py-20 px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-10 md:p-16 shadow-xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Latest <span className="text-orange-500">Promos</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Check out our latest deals and offers to save on your next craving!
          More promos coming soon.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Placeholder Promos */}
          <div className="p-8 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-orange-500 mb-2">50% OFF</h3>
            <p className="text-gray-600 mb-4">On your first order</p>
            <span className="text-sm font-mono bg-white px-4 py-2 rounded-full border border-orange-200">WELCOME50</span>
          </div>
          <div className="p-8 rounded-2xl bg-yellow-50 border border-yellow-100 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">FREE DELIVERY</h3>
            <p className="text-gray-600 mb-4">On orders over ₹500</p>
            <span className="text-sm font-mono bg-white px-4 py-2 rounded-full border border-yellow-200">FREEDEL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Promo;
