import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactPopup, setContactPopup] = useState(false);
  const [dynamicText, setDynamicText] = useState(""); // Start empty for typing effect
  const fullText = "CampusLink 2025";
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect for brand name
  useEffect(() => {
    if (index < fullText.length) {
      const typingInterval = setTimeout(() => {
        setDynamicText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 150); // Faster typing
      return () => clearTimeout(typingInterval);
    } else {
      // After typing finishes, keep cursor blinking or pause then restart
      const cursorBlink = setInterval(() => setShowCursor(s => !s), 500);
      const restartTimeout = setTimeout(() => {
        setIndex(0);
        setDynamicText("");
        setShowCursor(true); // Ensure cursor is visible when restarting
      }, 5000); // Restart typing after 5 seconds
      return () => {
        clearInterval(cursorBlink);
        clearTimeout(restartTimeout);
      };
    }
  }, [index, fullText]);


  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Close mobile menu on scroll
    }
  };

  // Variants for Framer Motion
  const mobileMenuContainerVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
        duration: 0.2
      },
    },
  };

  const mobileMenuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
        opacity: { duration: 0.3 }
      },
    },
    closed: {
      y: 30, // Start slightly lower
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
        opacity: { duration: 0.2 }
      },
    },
  };

  const contactPopupVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const iconButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.15, rotate: 5 },
    tap: { scale: 0.9 }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <motion.div
            className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 text-transparent bg-clip-text tracking-tight cursor-pointer"
            whileHover={{ scale: 1.03, letterSpacing: "0.02em" }}
            onClick={() => { setIndex(0); setDynamicText(""); }} // Restart typing on click
            title="Click to replay animation"
          >
            {dynamicText}
            <AnimatePresence>
              {showCursor && (index < fullText.length || (index === fullText.length && showCursor) ) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }} // Faster appearance/disappearance
                  className="ml-px" // Slightly detach cursor
                >
                  _ {/* Or use a | character */}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium text-sm items-center">
            {["Subscribe", "FAQ"].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="relative group text-gray-200 hover:text-yellow-400 transition-colors duration-200 py-1"
                whileHover="hover"
                variants={{ hover: { y: -2 } }}
              >
                {item.toUpperCase()}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 origin-center"
                  initial={{ scaleX: 0 }}
                  variants={{ hover: { scaleX: 1, transition: { duration: 0.3, ease:"circOut" } } }}
                />
              </motion.button>
            ))}
            <motion.button
              onClick={() => setContactPopup(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 py-2 rounded-full font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={menuOpen ? "times" : "bars"}
                className="bg-white/20 text-white p-2 rounded-full shadow-md focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                whileTap={{ scale: 0.85, rotate: menuOpen ? 180 : -180 }}
              >
                {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={mobileMenuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden px-4 pb-4 pt-2 space-y-1 bg-white/5 backdrop-blur-xl border-t border-white/10" // Added top border
            >
              {["Subscribe", "FAQ"].map((item) => (
                <motion.button
                  key={item}
                  variants={mobileMenuItemVariants}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left py-2.5 px-3 rounded-md text-gray-200 hover:bg-white/10 hover:text-yellow-300 transition-colors duration-150 text-base"
                >
                  {item.toUpperCase()}
                </motion.button>
              ))}
              <motion.button
                variants={mobileMenuItemVariants}
                onClick={() => {
                  setContactPopup(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 px-3 rounded-md text-yellow-400 font-semibold hover:bg-yellow-400/20 transition-colors duration-150 text-base"
              >
                Contact Us
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Contact Popup */}
      <AnimatePresence>
        {contactPopup && (
          <motion.div
            variants={contactPopupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
            onClick={() => setContactPopup(false)} // Close on overlay click
          >
            <motion.div
              // Prevent closing when clicking inside the popup
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center relative border border-white/10"
              // Add a subtle drag constraint for fun, optional
              // drag
              // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              // dragElastic={0.1}
            >
              <motion.button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => setContactPopup(false)}
                variants={iconButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaTimes size={20} />
              </motion.button>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3">
                Let's Connect!
              </h3>
              <p className="text-sm text-gray-300 mb-8">
                Reach out via WhatsApp or Email. We're excited to hear from you!
              </p>
              {[
                {
                  href: "https://wa.me/254705290655",
                  icon: FaWhatsapp,
                  text: "Chat on WhatsApp",
                  bg: "from-green-500 to-green-600",
                  hoverBg: "hover:from-green-400 hover:to-green-500",
                },
                {
                  href: "mailto:munenei977@gmail.com",
                  icon: FaEnvelope,
                  text: "Send an Email",
                  bg: "from-sky-500 to-blue-600",
                  hoverBg: "hover:from-sky-400 hover:to-blue-500",

                },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3.5 justify-center bg-gradient-to-r ${link.bg} text-white py-3.5 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-out ${link.hoverBg} ${i > 0 ? 'mt-4' : ''}`}
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <link.icon size={20} />
                  <span className="font-semibold text-base">{link.text}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;