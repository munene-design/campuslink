import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const HeroSection = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-8 bg-gradient-to-br from-[#2a5298] via-[#4c6ef5] to-[#6b48ff] text-white">
      {/* Subtle Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-15 z-0 bg-blend-overlay" />

      {/* Glass Layer */}
      <div className="relative z-10 max-w-3xl p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-lg text-center border border-white border-opacity-30">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-md">
          🎯 KUCCPS 2025 Smart Course Matching
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 drop-shadow-sm">
          Find the perfect course for your future with ease and confidence.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
          <Link
            to="/enter-grades"
            className="bg-yellow-400 hover:bg-yellow-300 text-black py-3 px-8 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            🎓 Find My Course Now
          </Link>
          <button
            onClick={() => setShowHowItWorks(true)}
            className="border border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            ❓ How It Works
          </button>
        </div>
      </div>

    {showHowItWorks && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
    <div
      className="bg-white max-w-lg w-full mx-4 p-6 rounded-2xl shadow-2xl relative border border-purple-200"
      data-aos="zoom-in"
      data-aos-duration="600"
    >
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        onClick={() => setShowHowItWorks(false)}
      >
        <FaTimes size={18} />
      </button>

      <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
        🚀 How Course Matching Works
      </h2>
      <ul className="space-y-3 text-gray-800 text-sm">
        <li className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-md shadow-sm">
          1️⃣ Enter your KCSE grades for required subjects.
        </li>
        <li className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-md shadow-sm">
          2️⃣ Input your KUCCPS cluster weights for 20 fields.
        </li>
        <li className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-md shadow-sm">
          3️⃣ Choose interests that align with your cluster performance.
        </li>
        <li className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-md shadow-sm">
          4️⃣ Get personalized course recommendations instantly!
        </li>
      </ul>
      <div className="text-center mt-5">
        <button
          onClick={() => setShowHowItWorks(false)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow"
        >
          Got It ✅
        </button>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default HeroSection;

