import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaPhoneAlt, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Floating shapes for the background (No changes needed here)
const FloatingShape = ({ delay, size, top, left, duration, children, className }) => (
  <motion.div
    className={`absolute ${className} opacity-10 blur-sm pointer-events-none`}
    style={{ width: size, height: size, top, left }}
    initial={{ y: 20, opacity: 0 }}
    animate={{
      y: [20, -20, 20],
      opacity: [0, 0.15, 0],
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
  const [mode, setMode] = useState("email"); // 'email' or 'phone'
  const [inputValue, setInputValue] = useState("");
  const [submissionState, setSubmissionState] = useState("idle"); // idle, loading, success, error
  const [isFocused, setIsFocused] = useState(false);

  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      setInputValue(""); // Clear input when switching modes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

    setSubmissionState("loading");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate a random success or error outcome
    if (Math.random() > 0.2) { // 80% chance of success
      setSubmissionState("success");
    } else {
      setSubmissionState("error");
    }

    // Reset form after a few seconds
    const resetDelay = submissionState === 'success' ? 4000 : 5000;
    setTimeout(() => {
      setSubmissionState("idle");
      setInputValue("");
    }, resetDelay);
  };
  
  // Animation Variants (mostly unchanged, added variants for new elements)
  const cardVariants = { /* ... no changes ... */ };
  const envelopeIconVariants = { /* ... no changes ... */ };
  const formContentVariants = { /* ... no changes ... */ };
  const successMessageVariants = { /* ... no changes ... */ };
  
  const TABS = [{ id: "email", label: "Email", icon: FaEnvelope }, { id: "phone", label: "Phone", icon: FaPhoneAlt }];

  return (
    <section
      className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-24 sm:py-32 px-6 overflow-hidden"
      id="Subscribe"
    >
      {/* Background elements and grid pattern (unchanged) */}
      <FloatingShape delay={0} size="150px" top="10%" left="15%" duration={25} className="bg-pink-500 rounded-full" />
      <FloatingShape delay={2} size="100px" top="60%" left="5%" duration={20} className="bg-sky-500 rounded-lg -rotate-12" />
      <FloatingShape delay={1} size="200px" top="20%" left="80%" duration={30} className="bg-yellow-400 rounded-xl rotate-6" />
      <FloatingShape delay={3} size="120px" top="75%" left="70%" duration={18} className="bg-green-500 rounded-full" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url(...)" }}></div>

      <motion.div
        className="relative max-w-lg mx-auto rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl text-center space-y-6 z-10"
        variants={cardVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={ submissionState === "idle" ? { scale: 1.02, boxShadow: "0px 20px 40px rgba(0,0,0,0.3)" } : {} }
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {submissionState === "success" ? (
            <motion.div
              key="success"
              variants={successMessageVariants} initial="hidden" animate="visible" exit="hidden"
              className="flex flex-col items-center justify-center h-full py-8"
            >
              <FaCheckCircle className="text-6xl text-green-400 mb-6" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
                You're Subscribed!
              </h2>
              <p className="opacity-80 mt-2 text-gray-200">
                Welcome aboard! Expect updates soon.
              </p>
            </motion.div>
          // [!code ++]
          ) : submissionState === "error" ? (
            <motion.div
              key="error"
              variants={successMessageVariants} initial="hidden" animate="visible" exit="hidden"
              className="flex flex-col items-center justify-center h-full py-8"
            >
              <FaExclamationTriangle className="text-6xl text-red-400 mb-6" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                Something Went Wrong
              </h2>
              <p className="opacity-80 mt-2 text-gray-200">
                Please try submitting again in a moment.
              </p>
            </motion.div>
          // [!code --]
          ) : (
            <motion.div
              key="form"
              variants={formContentVariants} initial="hidden" animate="visible" exit="hidden"
              className="space-y-6"
            >
              <motion.div
                className="flex justify-center"
                variants={envelopeIconVariants}
                animate={submissionState === "loading" ? "success" : "rest"}
                whileHover="hover"
              >
                <FaEnvelope className="text-5xl text-yellow-300" />
              </motion.div>

              <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
                <span className="block">Unlock Campus Updates</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Get exclusive alerts, program news & KUCCPS insights directly. Don't miss out!
              </p>

              {/* [!code ++] */}
              {/* --- TABS for Email/Phone --- */}
              <div className="flex justify-center bg-white/5 rounded-full p-1.5 space-x-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleModeChange(tab.id)}
                    className={`${
                      mode === tab.id ? "" : "hover:bg-white/10"
                    } relative w-full rounded-full py-2.5 text-sm font-medium text-white transition focus-visible:outline-2`}
                  >
                    {mode === tab.id && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 mix-blend-plus-lighter">{tab.label}</span>
                  </button>
                ))}
              </div>
              {/* [!code --] */}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 items-center justify-center"
              >
                <div className="relative w-full sm:w-auto flex-grow">
                  {/* [!code ++] */}
                  {/* --- Input Icon --- */}
                  <motion.div 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-300"
                    key={mode} // Re-animate icon on mode change
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.3}}
                  >
                    {mode === 'email' ? <FaEnvelope /> : <FaPhoneAlt />}
                  </motion.div>
                  {/* [!code --] */}
                  <motion.input
                    key={mode} // Force re-render on mode change for placeholder
                    type={mode === "email" ? "email" : "tel"}
                    placeholder={isFocused ? "" : (mode === 'email' ? 'your.email@example.com' : '0712 345 678')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required
                    disabled={submissionState === "loading"}
                    className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/80 border border-transparent focus:border-yellow-400/50 transition-all duration-300 shadow-sm"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(253, 224, 71, 0.3)" }}
                  />
                  <motion.label
                    className="absolute left-12 text-gray-400 pointer-events-none" // Adjusted left padding for icon
                    animate={{
                      y: isFocused || inputValue ? "-110%" : "50%",
                      opacity: isFocused || inputValue ? 1 : 0,
                      fontSize: isFocused || inputValue ? "0.75rem" : "1rem",
                      color: isFocused ? "#FDE047" : "#9CA3AF"
                    }}
                    transition={{ type: "spring", damping: 15, stiffness: 150 }}
                  >
                    {mode === 'email' ? 'Email Address' : 'Phone Number'}
                  </motion.label>
                </div>

                <motion.button
                    type="submit"
                    disabled={submissionState === "loading" || !inputValue}
                    className={`bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg w-full sm:w-auto
                                    ${submissionState === "loading" || !inputValue ? "opacity-70 cursor-not-allowed" : "hover:from-yellow-300 hover:to-orange-400 hover:shadow-xl hover:scale-105"}`}
                    whileTap={submissionState !== "loading" ? { scale: 0.97, transition: {type: "spring", stiffness:500, damping:20} } : {}}
                >
                  {/* ... loading spinner logic (unchanged) ... */}
                  {submissionState === "loading" ? (
                    <motion.div className="flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
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