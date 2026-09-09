import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";
import transparentLogo from "../assets/images/transparentLogo.png";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const { register, isRegistering } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAnimation, setShowAnimation] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const ROLE_OPTIONS = [
    {
      id: "customer",
      title: "Customer",
      description: "Order your favorite meals",
      icon: "🍕",
    },
    {
      id: "rider",
      title: "Delivery Partner",
      description: "Deliver and earn rewards",
      icon: "🚴",
    },
    {
      id: "partner",
      title: "Restaurant Manager",
      description: "Grow your business",
      icon: "🏪",
    },
  ];

  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.length >= 12) strength += 25;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 15;
    if (/[!@#$%^&*]/.test(pwd)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(data.password);

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!data.role) newErrors.role = "Please select your role";
    }
    if (step === 2) {
      if (!data.name) {
        newErrors.name = "Full name is required";
      } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
        newErrors.name = "Name should contain only letters";
      }
      if (!data.email) {
        newErrors.email = "Email is required";
      } else if (!/^[\w.-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!data.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
        newErrors.phone = "Please enter a valid 10-digit mobile number";
      }
    }
    if (step === 3) {
      if (!data.password) {
        newErrors.password = "Password is required";
      }
      // else if (data.password.length < 8) {
      //   newErrors.password = "Password must be at least 8 characters";
      // }
      if (!confirm) {
        newErrors.confirm = "Please confirm your password";
      } else if (data.password !== confirm) {
        newErrors.confirm = "Passwords do not match";
      }
      if (!agreedToTerms) {
        newErrors.terms = "You must agree to the terms and conditions";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((item) => ({ ...item, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleSelect = (roleId) => {
    setData((prev) => ({ ...prev, role: roleId }));
    setErrors((prev) => ({ ...prev, role: "" }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    try {
      await register(data);
      navigate("/");
    } catch (error) {
      console.log("Error in registration: ", error);
      setData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
      setConfirm("");
      setCurrentStep(1);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient md:pt-20 md:pb-4 px-4 relative overflow-hidden">
        {/* Background Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl relative z-10"
        >
          <div className="text-center mb-10">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            >
              Join Cravings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg"
            >
              Create your account in just {3 - currentStep + 1} step
              {3 - currentStep !== 0 ? "s" : ""}
            </motion.p>
            <div className="flex gap-2 justify-center mt-8">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className="h-2 rounded-full bg-gray-300 flex-1 max-w-25"
                  animate={{
                    background:
                      step < currentStep
                        ? "linear-gradient(90deg, #ff6b35, #ffb703)"
                        : step === currentStep
                          ? "linear-gradient(90deg, #ff6b35, #ffb703)"
                          : "#d1d5db",
                  }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      What brings you to Cravings?
                    </h2>
                    <p className="text-gray-600">
                      Select your role to get started
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ROLE_OPTIONS.map((role) => (
                      <motion.button
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleSelect(role.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative p-6 rounded-2xl border-2 transition-all overflow-hidden group ${
                          data.role === role.id
                            ? "border-orange-500 bg-orange-50/70 shadow-lg"
                            : "border-gray-200/50 bg-white/50 hover:border-orange-300"
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="text-5xl mb-4">{role.icon}</div>
                          <h3 className="font-bold text-gray-900 mb-1 text-lg">
                            {role.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {role.description}
                          </p>
                          {data.role === role.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold"
                            >
                              <FiCheck size={14} />
                              Selected
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  {errors.role && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg"
                    >
                      <span>⚠️</span>
                      <span>{errors.role}</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Tell us about yourself
                    </h2>
                    <p className="text-gray-600">
                      We'll use this to personalize your experience
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all bg-white/50 focus:outline-none ${
                        errors.name
                          ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                          : "border-white hover:border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <span>⚠️</span> {errors.name}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-900">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all bg-white/50 focus:outline-none ${
                        errors.email
                          ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                          : "border-white hover:border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <span>⚠️</span> {errors.email}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-900">
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="bg-gray-100 border-2 border-gray-200 px-4 py-3.5 rounded-l-xl flex items-center text-gray-600 font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        maxLength="10"
                        className={`flex-1 px-4 py-3.5 rounded-r-xl border-2 transition-all bg-white/50 focus:outline-none ${
                          errors.phone
                            ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                            : "border-white border-l-gray-200 hover:border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.phone && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <span>⚠️</span> {errors.phone}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Secure your account
                    </h2>
                    <p className="text-gray-600">Create a strong password</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-900">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all bg-white/50 focus:outline-none ${
                          errors.password
                            ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                            : "border-white hover:border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPass ? (
                          <IoMdEye className="w-5 h-5" />
                        ) : (
                          <IoMdEyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {data.password && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                      >
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4].map((index) => (
                            <div
                              key={index}
                              className={`h-2 flex-1 rounded-full transition-colors ${
                                passwordStrength >= index * 25
                                  ? passwordStrength <= 40
                                    ? "bg-red-500"
                                    : passwordStrength <= 70
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 flex items-center justify-between">
                          <span>
                            {passwordStrength <= 40
                              ? "Weak"
                              : passwordStrength <= 70
                                ? "Good"
                                : "Strong"}{" "}
                            password
                          </span>
                          <span className="font-semibold text-gray-900">
                            {passwordStrength}%
                          </span>
                        </p>
                      </motion.div>
                    )}

                    {errors.password && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <span>⚠️</span> {errors.password}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-900">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        value={confirm}
                        onChange={(e) => {
                          setConfirm(e.target.value);
                          if (errors.confirm)
                            setErrors((p) => ({ ...p, confirm: "" }));
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all bg-white/50 focus:outline-none ${
                          errors.confirm
                            ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                            : "border-white hover:border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPass ? (
                          <IoMdEye className="w-5 h-5" />
                        ) : (
                          <IoMdEyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirm && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <span>⚠️</span> {errors.confirm}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    space-y-2
                    className="bg-orange-50 rounded-2xl p-5 border-2 border-orange-100"
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                          if (e.target.checked && errors.terms)
                            setErrors((p) => ({ ...p, terms: "" }));
                        }}
                        className="w-5 h-5 rounded-lg border-2 border-orange-300 accent-orange-500 cursor-pointer mt-1"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        I agree to the{" "}
                        <button
                          type="button"
                          className="text-orange-600 font-semibold hover:underline"
                        >
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="text-orange-600 font-semibold hover:underline"
                        >
                          Privacy Policy
                        </button>
                      </span>
                    </label>
                    {errors.terms && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2 mt-3"
                      >
                        <span>⚠️</span> {errors.terms}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-10 pt-8 border-t border-gray-200"
            >
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep((p) => p - 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3.5 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back
                </motion.button>
              )}

              {currentStep <= 3 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isRegistering}
                  whileHover={{ scale: isRegistering ? 1 : 1.02 }}
                  whileTap={{ scale: isRegistering ? 1 : 0.98 }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isRegistering ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <AiOutlineLoading3Quarters className="w-5 h-5" />
                      </motion.div>
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              )}
            </motion.div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-gray-600 text-sm mt-8"
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-orange-600 font-bold hover:text-orange-700 transition-colors"
            >
              Sign In
            </button>
          </motion.p>
        </motion.div>

        {showAnimation && (
          <>
            <Lottie
              animationData={celebrate}
              loop
              className="fixed top-[50%] -translate-y-[50%] left-0 -translate-x-[50%] scale-180"
            />
            <Lottie
              animationData={celebrate}
              loop
              className="fixed top-[50%] -translate-y-[50%] right-0 translate-x-[50%] scale-180"
            />
          </>
        )}
      </div>
    </>
  );
};

export default Register;
