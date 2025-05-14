import { useState } from "react";
import { FaHandPointRight, FaTimes } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-indigo-700 to-purple-800 text-white py-16 px-6 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          🎯 Ready to Find Your Dream Course?
        </h2>
        <p className="text-lg md:text-xl opacity-90">
          Discover personalized university options based on your KCSE results.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/enter-grades"
            className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl font-bold text-black shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2 animate-bounce">
              <FaHandPointRight />
            </span>
            Find My Match
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            <GiClick className="text-lg" />
            How It Works
          </button>
        </div>

        {/* Glow background */}
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-400 opacity-30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div
            className="bg-white max-w-lg w-full mx-4 p-6 rounded-2xl shadow-2xl relative border border-purple-200"
            data-aos="zoom-in"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
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
                onClick={() => setShowModal(false)}
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
}
