import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";
import api from "../config/Api";
import transparentLogo from "../assets/images/transparentLogo.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ForgetPasswordModal from "../components/publicModels/ForgetPasswordModal";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const { login, isLogging } = useAuthStore();
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((item) => ({ ...item, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const res = await login(data);
      if (rememberMe) {
        localStorage.setItem("CravingsEmail", data.email);
      }
      handleReset(e);
      switch (res.role) {
        case "rider":
          navigate("/rider");
          break;
        case "customer":
          navigate("/customer");
          break;
        case "partner":
          navigate("/partner");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          break;
      }
      setShowAnimation(true);
    } catch (error) {
      console.log("Error in login: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setData({ email: "", password: "" });
    setShowAnimation(false);
  };

  return (
    <>
      <div className="min-h-[90dvh] w-full flex items-center justify-center bg-gradient py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-block mb-6"
            >
              <img
                src={transparentLogo}
                alt="Cravings logo"
                className="w-24 h-24"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg"
            >
              Sign in to continue your food journey
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-900 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg"
                >
                  <span>⚠️</span>
                  <span>{errors.email}</span>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-900 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed focus:outline-none ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                >
                  {showPass ? (
                    <IoMdEye className="w-5 h-5" />
                  ) : (
                    <IoMdEyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg"
                >
                  <span>⚠️</span>
                  <span>{errors.password}</span>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between pt-2"
            >
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-5 h-5 rounded-lg border-2 border-gray-300 accent-orange-500 cursor-pointer transition-all group-hover:border-orange-500 disabled:opacity-50"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() => setIsForgetPasswordOpen(true)}
                disabled={isLoading}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:underline"
              >
                Forgot password?
              </button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <AiOutlineLoading3Quarters className="w-5 h-5" />
                  </motion.div>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500 font-medium">
                  New to Cravings?
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate("/register")}
              disabled={isLoading}
              className="w-full py-3.5 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center text-gray-600 text-sm mt-8"
          >
            Need help?{" "}
            <a
              href="mailto:support@cravings.com"
              className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              Contact Support
            </a>
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

      {isForgetPasswordOpen && (
        <ForgetPasswordModal onClose={() => setIsForgetPasswordOpen(false)} />
      )}
    </>
  );
};

export default Login;
