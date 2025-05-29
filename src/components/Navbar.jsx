import React, { useState } from "react";
import { FaBars, FaTimes, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactPopup, setContactPopup] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-pink-500 text-transparent bg-clip-text tracking-wider"
            whileHover={{ scale: 1.05 }}
          >
            CampusLink 2025
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 font-semibold text-base items-center text-gray-800">
  <button onClick={() => scrollTo("updates")} className="hover:text-yellow-500 transition">Updates</button>
  <button onClick={() => scrollTo("faq")} className="hover:text-yellow-500 transition">FAQ</button>

            <button
              onClick={() => setContactPopup(true)}
              className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md"
            >
              Contact Us
            </button>
          </div>

          {/* Hamburger Icon */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9, rotate: 90 }}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden px-6 pb-4 space-y-3 text-base bg-white/10 backdrop-blur-lg text-white"
            >
              <button onClick={() => scrollTo("updates")} className="block w-full text-left hover:text-yellow-300">Updates</button>
              <button onClick={() => scrollTo("faq")} className="block w-full text-left hover:text-yellow-300">FAQ</button>
              <button
                onClick={() => {
                  setContactPopup(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-yellow-400 font-semibold"
              >
                Contact Us
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Contact Popup */}
      <AnimatePresence>
        {contactPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center relative border border-white/20">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={() => setContactPopup(false)}
              >
                <FaTimes />
              </button>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">Let's Talk!</h3>
              <p className="text-sm text-gray-600 mb-6">
                Reach out via WhatsApp or Email and we’ll respond shortly.
              </p>
              <a
                href="https://wa.me/254705290655"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 justify-center bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-5 rounded-full shadow-lg hover:scale-105 transition"
              >
                <FaWhatsapp size={18} />
                <span className="font-semibold">Chat on WhatsApp</span>
              </a>
              <a
                href="mailto:munenei977@gmail.com"
                className="mt-4 flex items-center gap-3 justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-5 rounded-full shadow-lg hover:scale-105 transition"
              >
                <FaEnvelope size={18} />
                <span className="font-semibold">Send an Email</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
