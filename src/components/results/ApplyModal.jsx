// src/components/results/ApplyModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import PropTypes from 'prop-types';

const ApplyModal = ({ onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-gradient-to-br from-[#1D1C3D] to-[#121127] p-8 rounded-2xl shadow-2xl border border-white/10"
        >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <BookOpen /> Applying via KUCCPS
            </h2>
            <div className="prose prose-invert prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-purple-400 hover:prose-a:text-purple-300">
                <p>Follow these steps to apply for courses through the Kenya Universities and Colleges Central Placement Service (KUCCPS):</p>
                <ol>
                    <li>Visit the official KUCCPS portal.</li>
                    <li>Log in using your KCSE index number and password.</li>
                    <li>Select preferred courses and universities based on your qualifications.</li>
                    <li>Submit your application and pay the required fee before the deadline.</li>
                    <li>Regularly check the portal for placement updates.</li>
                </ol>
            </div>
            <button 
                onClick={onClose} 
                className="w-full mt-6 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
                Close
            </button>
        </motion.div>
    </motion.div>
);

ApplyModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ApplyModal;