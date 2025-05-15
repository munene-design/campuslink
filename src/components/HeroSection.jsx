import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-8 bg-gradient-to-br from-[#2a5298] via-[#4c6ef5] to-[#6b48ff] text-white">
      {/* Subtle Background Image */}
 <div
  className="absolute inset-0 bg-cover bg-center opacity-70 z-0"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
    filter: "brightness(0.9)"
  }}
></div>
      {/* Glass Layer */}
      <div
        className="relative z-10 max-w-4xl w-full mx-auto text-center bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10"
        data-aos="fade-up"
      >
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          🎯 KUCCPS 2025 Smart Course Matching
        </h1>
        <p
          className="text-lg md:text-xl mb-8 font-light text-white/90 drop-shadow-sm"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Find the perfect course for your future with ease and confidence.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-4"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
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

      {/* How It Works Modal */}
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