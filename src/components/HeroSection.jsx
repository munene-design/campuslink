import React from 'react';
import{Link} from "react-router-dom";

const HeroSection = () => {
  return (
  <section className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-8 bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1e3c72] text-white">


      {/* Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse top-[-100px] left-[-100px] z-0" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-400 rounded-full mix-blend-screen filter blur-2xl opacity-20 animate-ping bottom-[-150px] right-[-100px] z-0" />

      {/* Glass Layer */}
      <div className="relative z-10 max-w-3xl p-10 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg text-center border border-white border-opacity-20">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          🎯 KUCCPS 2024 Smart Course Matching
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Find the perfect course for your future with ease and confidence.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
         <Link
            to="/enter-grades"
            className="bg-yellow-400 hover:bg-yellow-300 text-black py-3 px-8 rounded-full font-semibold shadow-md transition-all duration-300"
          >
              🎓 Find My Course Now
        </Link> 
          <a
            href="#faq"
            className="border border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            ❓ How It Works
          </a>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;
