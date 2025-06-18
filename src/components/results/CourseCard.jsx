// src/components/results/CourseCard.jsx
import React, { useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const CourseCard = memo(({ result, index, setSelectedCourse }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] } }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="group course-card relative bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 overflow-hidden"
                role="article"
            >
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl">{result.emoji}</div>
                            <h3 className="text-xl font-bold text-white tracking-tight">{result.course}</h3>
                        </div>
                        <p className="text-sm text-purple-300 mb-6">Top Institutions</p>
                        <ul className="space-y-3 text-gray-300">
                            {result.universities.slice(0, 2).map((uni) => (
                                <li key={uni.code} className="flex justify-between items-center text-sm">
                                    <span className="truncate pr-4 flex items-center gap-2">
                                        <Star size={16} className="text-amber-400 flex-shrink-0" />
                                        {uni.name}
                                    </span>
                                    <span className="font-mono bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md">{uni.cutoff}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <motion.button
                        onClick={() => setSelectedCourse(result)}
                        className="w-full mt-8 flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors group-hover:bg-white/20"
                        aria-label={`Explore details for ${result.course}`}
                        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        Explore Details
                    </motion.button>
                </div>
            </motion.div>
            <style jsx>{`
                .course-card::before {
                    content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 100%;
                    background: radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.25), transparent 100%);
                    border-radius: inherit; opacity: 0; transition: opacity 0.4s;
                }
                .course-card:hover::before { opacity: 1; }
            `}</style>
        </>
    );
});

CourseCard.propTypes = {
    result: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setSelectedCourse: PropTypes.func.isRequired
};

CourseCard.displayName = "CourseCard";

export default CourseCard;