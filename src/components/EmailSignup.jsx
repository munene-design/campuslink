import { FaEnvelope } from "react-icons/fa";

export default function EmailSignup() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-800 to-purple-900 text-white py-20 px-6 overflow-hidden">
      <div className="max-w-xl mx-auto rounded-2xl p-8 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl text-center space-y-6">
        <div className="flex justify-center mb-4">
          <FaEnvelope className="text-4xl animate-bounce text-yellow-300" />
        </div>
        <h2 className="text-3xl font-bold">📬 Stay Updated</h2>
        <p className="opacity-90">
          Get real-time alerts on deadlines, programs & KUCCPS news.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-64 px-5 py-3 rounded-xl bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Subscribe ✉️
          </button>
        </form>
      </div>

      {/* Optional blob or glowing effect */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-purple-500 opacity-20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
