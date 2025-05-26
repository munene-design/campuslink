import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Target, BookOpen, HelpCircle, Search, CheckCircle, Zap, UserCheck, Award, X as LucideX } from "lucide-react"; // Added icons
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from 'framer-motion'; // Import for modal

const HeroSection = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 400,
        damping: 20
      },
    }),
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden pt-8 pb-8 bg-gradient-to-br from-[#233a6c] via-[#3b5bdb] to-[#5a38e0] text-white">
      {/* Subtle Background Image - slightly darker and more subtle */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0" // Reduced opacity
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          filter: "brightness(0.7) saturate(1.2)" // Adjusted filter
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Darkening overlay */}


      {/* Glass Layer Content Box */}
      <motion.div
        className="relative z-10 max-w-4xl w-full mx-auto text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12" // Adjusted padding & alpha
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Target className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" />
          Welcome to CampusLink
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 font-normal text-white/90" // Changed font-light to font-normal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          Your Smart Path to the Perfect Course in 2025. Discover your future with precision.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            to="/enter-grades"
            className="group flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-800 py-3 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base md:text-lg"
          >
            <Zap className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            Find My Course
          </Link>
          <button
            onClick={() => setShowHowItWorks(true)}
            className="group flex items-center justify-center gap-2 border-2 border-white/80 text-white py-3 px-8 rounded-full font-medium hover:bg-white/20 hover:border-white transition-all duration-300 transform hover:scale-105 text-base md:text-lg"
          >
            <HelpCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            How It Works
          </button>
        </motion.div>
      </motion.div>

      {/* How It Works Modal with Framer Motion */}
      <AnimatePresence>
        {showHowItWorks && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-800 to-slate-900 max-w-lg w-full p-6 md:p-8 rounded-2xl shadow-2xl relative border border-slate-700 text-white"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors"
                onClick={() => setShowHowItWorks(false)}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
              >
                <LucideX size={24} />
              </motion.button>

              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 mb-6 text-center flex items-center justify-center gap-2">
                <BookOpen className="w-7 h-7" />
                How Course Matching Works
              </h2>
              
              <motion.ul className="space-y-3 text-slate-200">
                {[
                  { icon: <UserCheck className="w-5 h-5 text-purple-400" />, text: "Enter your KCSE grades for required subjects." },
                  { icon: <Search className="w-5 h-5 text-pink-400" />, text: "Input your KUCCPS cluster weights for relevant fields." },
                  { icon: <CheckCircle className="w-5 h-5 text-yellow-400" />, text: "Choose interests that align with your strengths." },
                  { icon: <Award className="w-5 h-5 text-teal-400" />, text: "Get personalized course recommendations instantly!" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 bg-slate-700/50 border-l-4 border-purple-500 p-3.5 rounded-lg shadow-md"
                    custom={i}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="text-center mt-8">
                <motion.button
                  onClick={() => setShowHowItWorks(false)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                >
                  Got It!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;