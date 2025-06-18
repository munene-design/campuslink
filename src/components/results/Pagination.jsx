// src/components/results/Pagination.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null; // Don't render pagination if there's only one page
    }

    return (
        <div className="flex justify-center items-center mt-12 gap-4 text-sm">
            <motion.button 
                whileTap={{ scale: 0.9 }} 
                onClick={() => onPageChange(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1} 
                className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-50 hover:bg-white/20 transition-colors"
            >
                Prev
            </motion.button>
            <span className="font-mono">Page {currentPage} of {totalPages}</span>
            <motion.button 
                whileTap={{ scale: 0.9 }} 
                onClick={() => onPageChange(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages} 
                className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-50 hover:bg-white/20 transition-colors"
            >
                Next
            </motion.button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;