// src/components/results/ResultsHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ResultsHeader = () => (
    <header className="text-center my-12">
        <motion.h1 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
        >
            Your University Pathway
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto"
        >
            Based on your results, here are the courses and universities within your reach. Explore your future.
        </motion.p>
    </header>
);

export default ResultsHeader;