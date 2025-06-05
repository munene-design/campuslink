import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import ClusterHelpModal from '../ClusterHelpModal'; // Make sure this component exists

const ClusterWeightPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // State to hold all input values in a single object
    const [clusterValues, setClusterValues] = useState({});

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }, []);

    // All 20 clusters with their specific names and icons
    const clusters = [
        { name: "Law", icon: "⚖️" },
        { name: "Business", icon: "💼" },
        { name: "Social Sciences", icon: "🌍" },
        { name: "Engineering", icon: "🛠️" },
        { name: "Medicine", icon: "🏥" },
        { name: "Computing", icon: "💻" },
        { name: "Education", icon: "📚" },
        { name: "Architecture", icon: "🏛️" },
        { name: "Agriculture", icon: "🌾" },
        { name: "Environmental Studies", icon: "🌿" },
        { name: "Mathematics & Statistics", icon: "📊" },
        { name: "Economics", icon: "💰" },
        { name: "Biological Sciences", icon: "🧬" },
        { name: "Physical Sciences", icon: "🔬" },
        { name: "Communication & Media", icon: "🗞️" },
        { name: "Psychology", icon: "🧠" },
        { name: "Hospitality & Tourism", icon: "🏨" },
        { name: "Fine Arts & Design", icon: "🎨" },
        { name: "Geography & Earth Sciences", icon: "🌎" },
        { name: "Theology & Philosophy", icon: "🕊️" },
    ];

    // Handles input changes and enforces the '0.000' format
    const handleInputChange = (clusterIndex, value) => {
        // Allows a single digit, an optional dot, and up to three decimal places.
        if (/^[0-9](\.[0-9]{0,3})?$/.test(value) || value === "") {
             setClusterValues(prev => ({ ...prev, [clusterIndex]: value }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
            {/* Animated Gradient Blobs for a dynamic background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 sm:px-6">
                <div className="max-w-4xl w-full mx-auto space-y-8">

                    {/* Animated Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg"
                    >
                        🎯 Enter Your KUCCPS Cluster Weights
                    </motion.h1>

                    {/* Help Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm hover:bg-white/20 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            <span className="text-xl">❓</span> How do I find my cluster weights?
                        </button>
                    </motion.div>

                    <AnimatePresence>
                        {isModalOpen && <ClusterHelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
                    </AnimatePresence>

                    {/* Glassmorphism Input Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                        className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10"
                    >
                        {/* THIS IS THE SCROLLABLE CONTAINER. All 20 clusters are inside. */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar">
                            {clusters.map((cluster, index) => (
                                <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                                    <label className="flex items-start text-lg text-purple-300 font-medium mb-2">
                                        <span className="text-2xl mr-3">{cluster.icon}</span>
                                        <div>
                                            <span className="font-semibold text-white">Cluster {index + 1}:</span>
                                            <span className="italic text-purple-300/80 ml-2">{cluster.name}</span>
                                        </div>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            maxLength="5" // e.g., 1.234
                                            value={clusterValues[index] || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            placeholder="0.000"
                                            className="w-full bg-gray-900/50 rounded-xl border-2 border-purple-500/30 p-3 text-white font-mono text-lg tracking-widest shadow-inner focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition-all duration-300 placeholder-gray-500 text-center"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Button */}
                        <div className="text-center mt-10">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/enter-interest")}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform"
                            >
                                Continue ➡
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ClusterWeightPage;