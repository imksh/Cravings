import { motion } from "motion/react";
import Lottie from "lottie-react";
import delivery from "../assets/animations/delivery.json";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="px-[7.5%] pt-20 overflow-x-hidden">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            About <span className="text-(--primary)">Cravings</span>
          </h1>

          <p className="text-slate-600 mt-6 text-lg leading-relaxed">
            Cravings is built for people who love good food but hate waiting. We
            connect you with your favorite restaurants and deliver fresh,
            delicious meals straight to your doorstep — fast, simple, and
            reliable.
          </p>

          <p className="text-slate-600 mt-4">
            Whether you’re lazy, busy, or just hungry — Cravings has your back.
          </p>
        </div>

        <div className="flex justify-center">
          <Lottie animationData={delivery} className="w-[320px]" />
        </div>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mt-28 text-center"
      >
        <h2 className="text-4xl font-bold">
          Our <span className="text-(--primary)">Mission</span>
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-slate-600 text-lg">
          To make food ordering effortless by combining speed, quality, and
          technology — so every craving is satisfied without stress.
        </p>
      </motion.div>

      {/* Why choose us */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        <div className="p-6 rounded-2xl bg-white shadow">
          <h3 className="text-xl font-bold">🚀 Fast Delivery</h3>
          <p className="text-slate-600 mt-3">
            Get your food delivered hot and fresh with optimized delivery
            routes.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white shadow">
          <h3 className="text-xl font-bold">🍔 Best Restaurants</h3>
          <p className="text-slate-600 mt-3">
            Choose from hundreds of trusted restaurants near you.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white shadow">
          <h3 className="text-xl font-bold">❤️ Built for You</h3>
          <p className="text-slate-600 mt-3">
            Designed with a smooth UI and simple experience — no confusion.
          </p>
        </div>
      </motion.div>

      {/* Footer text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-28 text-center"
      >
        <h3 className="text-2xl font-bold">
          Cravings —{" "}
          <span className="text-(--primary)">Because hunger can’t wait.</span>
        </h3>
      </motion.div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default About;
