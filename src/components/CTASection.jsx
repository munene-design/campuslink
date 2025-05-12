import { FaHandPointRight } from "react-icons/fa";
import { GiClick } from "react-icons/gi";

export default function CTASection() {
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
          <a
            href="/enter-grades"
            className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl font-bold text-black shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2 animate-bounce">
              <FaHandPointRight />
            </span>
            Find My Match
          </a>

          <a
            href="#how-it-works"
            className="flex items-center gap-2 border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            <GiClick className="text-lg" />
            How It Works
          </a>
        </div>

        {/* Optional glow effect background */}
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-400 opacity-30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}