import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Target, BookOpen, HelpCircle, Search, CheckCircle, Zap, UserCheck, Award, X as LucideX, ArrowDown, ChevronDown } from "lucide-react"; // Added ChevronDown as an option
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // ... (rest of your existing variants and state)
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
    },
  };
  
  const titleItemVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15, duration: 0.7 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 25, duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.25, ease: "easeIn" } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -35 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15, 
        type: "spring",
        stiffness: 280,
        damping: 25
      },
    }),
  };


  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden p-4 sm:p-6 animated-gradient-bg" 
      initial="hidden"
      animate="visible"
      variants={heroContainerVariants}
    >
      {/* ... (rest of your card content) ... */}
      <motion.div
        className="relative z-10 max-w-5xl w-full mx-auto text-center bg-white/60 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl shadow-pink-500/20 p-8 sm:p-10 md:p-16"
        variants={itemVariants} 
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-6 flex items-center justify-center gap-x-3 sm:gap-x-4 leading-tight
                     text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          variants={titleItemVariants}
        >
          <Target className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex-shrink-0 text-purple-600" />
          CampusLink
        </motion.h1>
        <motion.p
          className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 font-medium text-slate-700 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Unlock your academic future. We provide precise course recommendations for 2025, tailored to your grades and aspirations.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-7"
          variants={itemVariants}
        >
          <Link
            to="/enter-grades"
            className="group relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 text-white py-3.5 sm:py-4 px-10 sm:px-12 rounded-full font-bold shadow-lg shadow-pink-500/40 hover:shadow-xl hover:shadow-pink-500/60 transition-all duration-300 transform hover:scale-[1.05] text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-pink-500/50 overflow-hidden"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-out group-hover:rotate-[-25deg] group-hover:scale-125" />
            Discover Courses
          </Link>
          <button
            onClick={() => setShowHowItWorks(true)}
            className="group flex items-center justify-center gap-2.5 border-2 border-purple-500 text-purple-600 py-3 sm:py-[14px] px-8 sm:px-10 rounded-full font-semibold hover:bg-purple-500 hover:text-white hover:border-purple-600 transition-all duration-300 transform hover:scale-[1.05] text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-purple-500/40"
          >
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-out group-hover:rotate-[25deg] group-hover:scale-110" />
            How It Works
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showHowItWorks && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/30 backdrop-blur-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: {duration: 0.35, ease: "easeOut"}}}
            exit={{ opacity: 0, transition: {duration: 0.25, ease: "easeIn"}}}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-2xl max-w-xl w-full p-7 sm:p-8 rounded-xl shadow-2xl relative border border-slate-300 text-slate-800"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 p-2 rounded-full hover:bg-slate-200/70 transition-all duration-200"
                onClick={() => setShowHowItWorks(false)}
                whileHover={{scale: 1.2, rotate: 90, transition: {type: "spring", stiffness:350, duration: 0.3}}}
                whileTap={{scale: 0.9, rotate: 0}}
                aria-label="Close modal"
              >
                <LucideX size={26} />
              </motion.button>

              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 mb-8 text-center flex items-center justify-center gap-2.5">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
                Simple Steps to Your Future
              </h2>
              
              <motion.ul className="space-y-4">
                {[
                  { icon: <UserCheck className="w-7 h-7 text-sky-500 flex-shrink-0" />, text: "Securely input your KCSE grades and subject scores." },
                  { icon: <Search className="w-7 h-7 text-pink-500 flex-shrink-0" />, text: "Provide KUCCPS cluster weights for your target fields." },
                  { icon: <CheckCircle className="w-7 h-7 text-yellow-500 flex-shrink-0" />, text: "Highlight your interests and academic strengths." },
                  { icon: <Award className="w-7 h-7 text-emerald-500 flex-shrink-0" />, text: "Receive instant, personalized course recommendations!" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4 bg-white/50 border-l-4 border-sky-500 p-4 rounded-lg shadow-md hover:bg-white/80 hover:shadow-lg hover:border-sky-400 transition-all duration-200"
                    custom={i}
                    variants={listItemVariants}
                  >
                    {item.icon}
                    <span className="text-base sm:text-lg text-slate-700">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="text-center mt-9">
                <motion.button
                  onClick={() => setShowHowItWorks(false)}
                  className="bg-gradient-to-r from-sky-500 to-pink-600 hover:from-sky-600 hover:to-pink-700 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-pink-500/50"
                  whileHover={{scale: 1.08, transition: {type: "spring", stiffness: 300}}}
                  whileTap={{scale: 0.95}}
                >
                  Let's Go! ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODIFIED ARROW SECTION */}
      <motion.a
        href="#next-section"
        aria-label="Scroll to next section"
        // Apply new styles for the circular, gradient button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                   w-12 h-12 sm:w-14 sm:h-14 
                   flex items-center justify-center 
                   rounded-full 
                   bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 
                   text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }} // Start slightly lower and faded
        animate={{
          opacity: 1,
          y: [0, -7, 0], // Target y-keyframes for bobbing: land at 0, move up to -7, back to 0
        }}
        transition={{
          delay: 1.8, // Overall delay for the arrow to start its animation
          opacity: { duration: 0.5, ease: "easeOut" }, // Fade-in transition
          y: { // Transition for the y-property (bobbing)
            // The initial movement from initial.y (20) to the first keyframe y (0)
            // will use these settings if not overridden by a specific spring for initial appearance.
            // For a continuous bob after an initial spring, it's more complex.
            // This setup will make the y animation (including initial move from 20 to 0) follow these loop settings.
            duration: 1.6,      // Duration of one full bob cycle (0 -> -7 -> 0)
            repeat: Infinity,   // Repeat forever
            repeatType: "loop", // "loop" is good for [A, B, A] sequence. "mirror" for [A,B] then [B,A]
            ease: "easeInOut",  // Smooth easing for the bobbing
          }
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0px 0px 25px rgba(236, 72, 153, 0.6)", // Pinkish glow (hex #EC4899 -> rgba(236, 72, 153, alpha))
          // y: -3 // Optionally lift it a bit more on hover, Framer will manage this over the animation
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Use ArrowDown or ChevronDown for a different feel */}
        <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8" />
        {/* <ChevronDown className="w-8 h-8 sm:w-9 sm:h-9" /> */}
      </motion.a>

    </motion.section>
  );
};

export default HeroSection;