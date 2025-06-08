import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const GradesPage = () => {
    const [grades, setGrades] = useState({});

    useEffect(() => {
        AOS.init({ duration: 800, once: true, offset: 30 });
    }, []);

    const handleGradeChange = (subject, grade) => {
        setGrades(prev => ({ ...prev, [subject]: grade }));
    };

    const gradeOptions = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];
    const compulsorySubjects = ['Mathematics ➕', 'English 📝', 'Kiswahili 🗣'];
    const categories = [
        { title: 'Sciences 🔬', subjects: ['Biology', 'Physics', 'Chemistry'] },
        { title: 'Humanities 🌍', subjects: ['Geography', 'History', 'CRE/IRE/HRE'] },
        { title: 'Technical & Others 🛠️', subjects: ['Business Studies', 'Agriculture', 'Computer Studies', 'Home Science', 'Art and Design', 'Music', 'French', 'German'] }
    ];

    // Button is disabled until the 3 compulsory subjects have grades
    const isContinueDisabled = !compulsorySubjects.every(subject => grades[subject]);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans py-16 px-4 relative overflow-hidden">
            {/* Animated Blob Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-10">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-5xl font-bold text-center drop-shadow-lg"
                >
                    <span className="text-5xl">🎓</span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                        Enter Your KCSE Grades
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10"
                >
                    {/* Compulsory Subjects Section */}
                    <div className="mb-8" data-aos="fade-up">
                        <h2 className="text-2xl font-semibold text-purple-300 mb-5 pb-3 border-b-2 border-purple-500/20">
                            📘 Compulsory Subjects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {compulsorySubjects.map((subject, idx) => (
                                <div key={idx}>
                                    <label className="block text-gray-300 font-medium mb-2">{subject}</label>
                                    <div className="relative">
                                        <select
                                            value={grades[subject] || ''}
                                            onChange={(e) => handleGradeChange(subject, e.target.value)}
                                            className="custom-select w-full rounded-xl border-2 border-purple-500/30 bg-gray-900/50 p-3 text-white shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition-all duration-300"
                                        >
                                            <option disabled value="">Select Grade</option>
                                            {gradeOptions.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Other Categories */}
                    {categories.map((category, index) => (
                        <div key={index} className="mb-8" data-aos="fade-up" data-aos-delay={index * 100}>
                            <h2 className="text-2xl font-semibold text-purple-300 mb-5 pb-3 border-b-2 border-purple-500/20">
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.subjects.map((subject, idx) => (
                                    <div key={idx}>
                                        <label className="block text-gray-300 font-medium mb-2">{subject}</label>
                                        <div className="relative">
                                            <select
                                                value={grades[subject] || ''}
                                                onChange={(e) => handleGradeChange(subject, e.target.value)}
                                                className="custom-select w-full rounded-xl border-2 border-purple-500/30 bg-gray-900/50 p-3 text-white shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition-all duration-300"
                                            >
                                                <option disabled value="">Select Grade</option>
                                                {gradeOptions.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="text-center mt-12" data-aos="zoom-in">
                        <Link
            to="/enter-cluster"
            className="bg-purple-600 text-white px-10 py-3 mt-6 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition duration-300 inline-block animate-bounce"
          >
            Continue ➡
          </Link>

                         {isContinueDisabled && (
                            <p className="text-purple-300/80 mt-3 text-sm">
                                Please select grades for all compulsory subjects to continue.
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GradesPage;