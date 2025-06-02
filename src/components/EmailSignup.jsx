import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Floating shapes for the background
const FloatingShape = ({ delay, size, top, left, duration, children, className }) => (
  <motion.div
    className={`absolute ${className} opacity-10 blur-sm pointer-events-none`}
    style={{ width: size, height: size, top, left }}
    initial={{ y: 20, opacity: 0 }}
    animate={{
      y: [20, -20, 20],
      opacity: [0, 0.15, 0], // Fade in, stay, fade out
      rotate: [0, Math.random() * 90 - 45, 0],
    }}
    transition={{
      delay,
      duration: duration || 20 + Math.random() * 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState("idle"); // idle, loading, success, error
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return; // Basic validation

    setSubmissionState("loading");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success for now
    setSubmissionState("success");

    // Reset form after a few seconds
    setTimeout(() => {
      setSubmissionState("idle");
      setEmail("");
    }, 4000);
  };

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 60, scale: 0.95, rotateX: -10 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        // Corrected cubic-bezier values: P2x changed from -0.01 to 0.1
        ease: [0.6, 0.05, 0.1, 0.9],
      },
    },
  };

  const envelopeIconVariants = {
    rest: { y: 0, scale: 1, color: "#FDE047" /* yellow-300 */ },
    hover: {
      y: [-2, -6, -2, -8, 0],
      scale: [1, 1.1, 1, 1.15, 1],
      color: ["#FDE047", "#FEF08A", "#FACC15", "#FEF08A", "#FDE047"],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
    success: {
      scale: [1, 1.5, 0],
      opacity: [1, 1, 0],
      color: "#4ADE80", // green-400
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formContentVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeIn" } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } },
  };

  const successMessageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", damping: 12, stiffness: 100, delay: 0.2 },
    },
  };

  return (
    <section
      className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-24 sm:py-32 px-6 overflow-hidden"
      id="Subscribe"
    >
      {/* Background elements */}
      <FloatingShape delay={0} size="150px" top="10%" left="15%" duration={25} className="bg-pink-500 rounded-full" />
      <FloatingShape delay={2} size="100px" top="60%" left="5%" duration={20} className="bg-sky-500 rounded-lg -rotate-12" />
      <FloatingShape delay={1} size="200px" top="20%" left="80%" duration={30} className="bg-yellow-400 rounded-xl rotate-6" />
      <FloatingShape delay={3} size="120px" top="75%" left="70%" duration={18} className="bg-green-500 rounded-full" />

      {/* Optional subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>

      <motion.div
        className="relative max-w-lg mx-auto rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl text-center space-y-6 z-10"
        variants={cardVariants}
        initial="initial"
        whileInView="animate" // Animates when it comes into view
        viewport={{ once: true, amount: 0.3 }}
        whileHover={ submissionState === "idle" ? { scale: 1.02, boxShadow: "0px 20px 40px rgba(0,0,0,0.3)" } : {} }
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {submissionState === "success" ? (
            <motion.div
              key="success"
              variants={successMessageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center justify-center h-full py-8" // Adjust height as needed
            >
              <FaCheckCircle className="text-6xl text-green-400 mb-6" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
                You're Subscribed!
              </h2>
              <p className="opacity-80 mt-2 text-gray-200">
                Welcome aboard! Expect updates soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              variants={formContentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div
                className="flex justify-center"
                variants={envelopeIconVariants}
                animate={submissionState === "loading" ? "success" : "rest"} // Reuse success animation for loading exit
                whileHover="hover"
              >
                <FaEnvelope className="text-5xl text-yellow-300" />
              </motion.div>

              <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
                <span className="block">Unlock Campus Updates</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Get exclusive alerts, program news & KUCCPS insights directly to your inbox. Don't miss out!
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-8"
              >
                <div className="relative w-full sm:w-auto flex-grow">
                  <motion.input
                    type="email"
                    placeholder={isFocused ? "" : "your.email@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required
                    disabled={submissionState === "loading"}
                    className="w-full px-5 py-3.5 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/80 border border-transparent focus:border-yellow-400/50 transition-all duration-300 shadow-sm"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(253, 224, 71, 0.3)" }}
                  />
                  <motion.label
                    className="absolute left-5 text-gray-400 pointer-events-none"
                    initial={{ y: "50%", opacity: 1 }}
                    animate={{
                      y: isFocused || email ? "-110%" : "50%",
                      opacity: isFocused || email ? 1 : 0,
                      fontSize: isFocused || email ? "0.75rem" : "1rem",
                      color: isFocused ? "#FDE047" : "#9CA3AF" // yellow-300 : gray-400
                    }}
                    transition={{ type: "spring", damping: 15, stiffness: 150 }}
                  >
                    Email Address
                  </motion.label>
                </div>

                <motion.button
                  type="submit"
                  disabled={submissionState === "loading"}
                  className={`bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg w-full sm:w-auto
                              ${submissionState === "loading" ? "opacity-70 cursor-not-allowed" : "hover:from-yellow-300 hover:to-orange-400 hover:shadow-xl hover:scale-105"}`}
                  whileTap={submissionState !== "loading" ? { scale: 0.97, transition: {type: "spring", stiffness:500, damping:20} } : {}}
                >
                  {submissionState === "loading" ? (
                    <motion.div className="flex items-center justify-center"
                      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                    >
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Subscribe <FaPaperPlane className="ml-2.5 text-sm" />
                    </div>
                  )}
                </motion.button>
              </form>
              <p className="text-xs text-gray-400/70 pt-2">
                We respect your privacy. No spam, ever.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}