// src/components/results/ResultsFooter.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen } from 'lucide-react';
import PropTypes from 'prop-types';

const ResultsFooter = ({ onDownload, onApplyClick, isDownloading, isDownloadDisabled }) => (
    <footer className="text-center mt-20 py-10 border-t border-white/10">
        <p className="text-gray-400 mb-4">Ready to take the next step?</p>
        <div className="flex justify-center gap-4">
            <motion.button 
                onClick={onDownload} 
                disabled={isDownloading || isDownloadDisabled} 
                whileHover={{ y: -2, scale: 1.05 }} 
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:bg-gray-500"
            >
                <Download size={18} /> {isDownloading ? "Generating..." : "Download"}
            </motion.button>
            <motion.button 
                onClick={onApplyClick} 
                whileHover={{ y: -2, scale: 1.05 }} 
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg"
            >
                <BookOpen size={18} /> How to Apply
            </motion.button>
        </div>
    </footer>
);

ResultsFooter.propTypes = {
    onDownload: PropTypes.func.isRequired,
    onApplyClick: PropTypes.func.isRequired,
    isDownloading: PropTypes.bool.isRequired,
    isDownloadDisabled: PropTypes.bool.isRequired,
};

export default ResultsFooter;