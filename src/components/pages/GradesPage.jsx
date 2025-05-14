import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

const GradesPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const gradeOptions = [
    'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'
  ];

  const compulsorySubjects = ['Mathematics ➕', 'English 📝', 'Kiswahili 🗣'];

  const categories = [
    {
      title: 'Sciences 🔬',
      subjects: ['Biology', 'Physics', 'Chemistry']
    },
    {
      title: 'Humanities 🌍',
      subjects: ['Geography', 'History', 'CRE/IRE/HRE']
    },
    {
      title: 'Technical & Business 💼',
      subjects: ['Business Studies']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4 relative">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1
          className="text-3xl font-bold text-center text-purple-700"
          data-aos="fade-down"
        >
          Enter Your KCSE Grades 🎓
        </h1>

        {/* Compulsory */}
        <div
          className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 border border-purple-200"
          data-aos="fade-up"
        >
          <h2 className="text-xl font-semibold text-purple-600 mb-4 text-center">
            Compulsory Subjects 📘
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {compulsorySubjects.map((subject, idx) => (
              <div key={idx}>
                <label className="block text-gray-700 font-medium mb-1">{subject}</label>
                <select className="w-full rounded-xl border border-gray-300 p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none">
                  <option value="">Select Grade</option>
                  {gradeOptions.map((grade, i) => (
                    <option key={i} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Other categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 border border-purple-200"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <h2 className="text-xl font-semibold text-purple-600 mb-4 text-center">
              {category.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {category.subjects.map((subject, idx) => (
                <div key={idx}>
                  <label className="block text-gray-700 font-medium mb-1">{subject}</label>
                  <select className="w-full rounded-xl border border-gray-300 p-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none">
                    <option value="">Select Grade</option>
                    {gradeOptions.map((grade, i) => (
                      <option key={i} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}

   <div className="text-center relative group" data-aos="zoom-in">
  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 shadow-lg">
    Proceed to Cluster Weights
  </div>
  <Link
  to="/enter-cluster"
  className="bg-purple-600 text-white px-10 py-3 mt-6 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition duration-300 inline-block animate-bounce"
>
  Continue ➡
</Link>
</div>
      </div>

     
    </div>
  );
};

export default GradesPage;