// src/components/results/FilterBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PropTypes from 'prop-types';

const FilterBar = ({ onSearch, sortBy, onSortChange }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8 p-2 flex flex-col md:flex-row gap-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 sticky top-4 z-50"
    >
        <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            <input
                type="text"
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search by course or university..."
                className="w-full pl-12 pr-4 py-3 bg-transparent rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
        </div>
        <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full md:w-auto appearance-none pl-4 pr-10 py-3 bg-transparent border border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none hover:bg-white/5 transition-colors"
        >
            <option value="cutoff">Sort by Cutoff</option>
            <option value="name">Sort by Name</option>
        </select>
    </motion.div>
);

FilterBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default FilterBar;