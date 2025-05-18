import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClusterHelpModal = ({ isOpen, onClose }) => {
  const steps = [
    {
      step: "Step 1",
      text: "Visit the official KUCCPS student portal:",
      link: "https://students.kuccps.net"
    },
    {
      step: "Step 2",
      text: "Log in using your KCSE Index Number, KCSE Year, and Password (Birth Certificate No or ID No)."
    },
    {
      step: "Step 3",
      text: "Click on My Courses or Cluster Weights section."
    },
    {
      step: "Step 4",
      text: "Record the values shown for Clusters 1–20 and enter them into this form."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white/90 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-purple-300"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <X size={22} />
            </motion.button>

            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-purple-700 mb-4 text-center"
            >
              📊 How to Get Your KUCCPS Cluster Weights
            </motion.h2>

            {/* Steps */}
            <ul className="space-y-4 text-gray-700">
              {steps.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.4 + index * 0.3, // Increased delay between steps
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                >
                  🔐 <strong>{item.step}:</strong> {item.text}
                  {item.link && (
                    <>
                      <br />
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 underline hover:text-purple-800"
                      >
                        {item.link}
                      </a>
                    </>
                  )}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }} // Delayed to appear after all steps
              className="text-center mt-6"
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
              >
                Got It 👍
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClusterHelpModal;