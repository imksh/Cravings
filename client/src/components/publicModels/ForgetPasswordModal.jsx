import React, { useState } from "react";
import api from "../../config/Api";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ForgetPasswordModal = ({ onClose }) => {
  const [data, setData] = useState({
    email: "",
    otp: "",
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isOtpSent) {
        if (isOtpVerified) {
          await api.post("/auth/reset-password", data);
          toast.success("Password updated successfully");
          onClose();
        } else {
          await api.post("/auth/verify-otp", data);
          setIsOtpVerified(true);
          toast.success("Otp verified successfully");
        }
      } else {
        await api.post("/auth/gen-otp", data);
        setIsOtpSent(true);
        toast.success("Otp Sent successfully");
      }
    } catch (err) {
      console.log("Error in verify otp: ", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-99">
      <div className="bg-white w-[90%] max-w-[500px] min-h-[40%] flex flex-col justify-center rounded-xl p-8 relative animate-fadeIn">
        {/* Close */}
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
        >
          <IoClose size={24} />
        </motion.button>

        <h2 className="text-xl font-bold text-center mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border p-3 rounded-lg w-full border-slate-300 disabled:bg-slate-300"
            value={data.email}
            onChange={handleChange}
            disabled={isOtpSent || loading}
          />

          {isOtpSent && (
            <input
              type="number"
              name="otp"
              placeholder="OTP"
              className="border p-3 rounded-lg w-full border-slate-300 disabled:bg-slate-300"
              value={data.otp}
              onChange={handleChange}
              disabled={isOtpVerified || loading}
            />
          )}

          {isOtpSent && isOtpVerified && (
            <>
              {" "}
              <input
                type="password"
                name="newPassword"
                placeholder="New password Password"
                className="border p-3 rounded-lg w-full border-slate-300 disabled:bg-slate-300"
                value={data.newPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border p-3 rounded-lg w-full border-slate-300 disabled:bg-slate-300"
                value={data.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? (
              <AiOutlineLoading3Quarters
                className="animate-spin mx-auto"
                size={24}
              />
            ) : isOtpSent ? (
              isOtpVerified ? (
                "Update Password"
              ) : (
                "Verify OTP"
              )
            ) : (
              "Send OTP"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
