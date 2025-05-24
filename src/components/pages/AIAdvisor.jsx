import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Bot, Sparkles, ChevronDown, BookOpen,
  GraduationCap, Briefcase, Clock, BarChart2, MessageCircle // Added MessageCircle for AI avatar
} from 'lucide-react';

const AIAdvisor = ({ selectedCourse, closeModal }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Greetings! I am your ${selectedCourse.course} Campuslink Advisor. I can illuminate your path regarding:\n• Celestial Cutoffs (Points)\n• Galactic Career Trajectories\n• University Constellations (Comparisons)\n• Stellar Course Requirements`,
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responses = {
        "cutoff": `The celestial alignment for ${selectedCourse.course} typically requires between ${selectedCourse.universities[0].cutoff} and ${selectedCourse.universities[1].cutoff} points. Top voyagers often score A- or higher.`,
        "career": `Graduates of ${selectedCourse.course} often embark on galactic careers as ${selectedCourse.careerPaths?.join(', ') || 'explorers in diverse industries'}. The success rate for employment is over 90% within 6 stellar months of graduation.`,
        "fees": `The cosmic investment for annual tuition ranges from ${selectedCourse.universities[0].fees} to ${selectedCourse.universities[1].fees}. Many star systems (universities) offer scholarships and financial nebulas (aid).`,
        "default": `${selectedCourse.course} is a ${selectedCourse.duration} odyssey with ${selectedCourse.demand} demand across the cosmos. The curriculum charts both theoretical galaxies and practical star-mapping.`
      };

      const aiResponse = {
        id: Date.now(),
        text: responses[
          input.toLowerCase().includes('cutoff') ? 'cutoff' :
          input.toLowerCase().includes('career') ? 'career' :
          input.toLowerCase().includes('fee') ? 'fees' : 'default'
        ],
        sender: 'ai'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Animation variants for messages
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md" // Darker backdrop
      >
        <motion.div
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg h-[80vh] bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl shadow-2xl shadow-indigo-500/30 flex flex-col border border-indigo-700/50 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-indigo-700/50 flex items-center justify-between bg-black/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-lg">
                <Sparkles className="text-yellow-300" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">{selectedCourse.course} Stellar Advisor</h3>
                <p className="text-xs text-indigo-300/70">Navigating your academic cosmos</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal}
              className="p-1.5 rounded-full text-indigo-300/70 hover:bg-indigo-700/50 hover:text-indigo-100 transition-colors"
              aria-label="Close advisor"
            >
              <X size={22} />
            </motion.button>
          </div>

          {/* Chat Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-indigo-700/50 scrollbar-track-transparent">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={`flex items-end gap-2 ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="p-1.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full self-start shadow-md">
                    <Sparkles className="text-yellow-300" size={18} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 shadow-md text-sm ${msg.sender === 'ai'
                    ? 'bg-indigo-800/70 text-indigo-100 rounded-2xl rounded-bl-md backdrop-blur-sm border border-indigo-600/30'
                    : 'bg-gradient-to-br from-pink-600 to-purple-700 text-white rounded-2xl rounded-br-md'}`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={`${i > 0 ? 'mt-2' : ''} leading-relaxed`}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-end gap-2 justify-start"
              >
                 <div className="p-1.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full self-start shadow-md">
                    <Sparkles className="text-yellow-300" size={18} />
                  </div>
                <div className="p-3 bg-indigo-800/70 rounded-2xl rounded-bl-md w-24 border border-indigo-600/30">
                  <div className="flex space-x-1.5 justify-center items-center h-5">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-indigo-700/50 bg-slate-900/50">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder={`Ask the stars about ${selectedCourse.course}...`}
                className="w-full p-3 pl-4 pr-12 bg-indigo-950/70 text-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 border border-indigo-700/50 placeholder-indigo-400/60"
                aria-label="Ask about this course"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-purple-400 hover:text-yellow-300 disabled:text-indigo-500/50 transition-colors"
                aria-label="Send message"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send size={20} />
              </motion.button>
            </div>
            <p className="mt-2.5 text-xs text-indigo-400/60 text-center">
              Try: cutoffs, career trajectories, university comparisons...
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAdvisor;

// Add this to your tailwind.config.js if you want custom scrollbars (optional)
// plugins: [
//   require('tailwind-scrollbar'),
// ],