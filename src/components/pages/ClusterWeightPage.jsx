import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ClusterHelpModal from '../ClusterHelpModal';
import { useNavigate } from 'react-router-dom';


const ClusterWeightPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 py-16 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Title */}
        <h1
          className="text-4xl font-extrabold text-center text-purple-800 drop-shadow-sm tracking-tight"
          data-aos="fade-down"
        >
          🎯 Enter Your KUCCPS Cluster Weights
        </h1>

        {/* Help Button */}
        <div className="text-center" data-aos="fade-up">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white border border-purple-300 px-5 py-2.5 rounded-full shadow-md hover:bg-purple-100 hover:text-purple-900 text-purple-700 font-semibold transition duration-300"
          >
            ❓ How do I find my cluster weights?
          </button>
        </div>

        {/* Help Modal */}
        <ClusterHelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Input Form Card */}
        <div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-200 p-8 sm:p-10 transition-all duration-300"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2">
            {clusters.map((cluster, index) => (
              <div key={index}>
                <label className="block text-purple-800 font-semibold mb-2 tracking-tight">
                  {cluster.icon} Cluster {index + 1}: <span className="italic text-purple-600">{cluster.name}</span>
                </label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="0.000"
                  className="w-full rounded-xl border border-purple-300 p-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center mt-10" data-aos="zoom-in">
           
           <button
              onClick={() => navigate("/enter-interest")}
                className="bg-purple-600 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition duration-300"
        >
               Continue ➡
           </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterWeightPage;

