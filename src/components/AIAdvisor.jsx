import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Sparkles,
} from 'lucide-react';

// Custom hook to detect if the screen is at or above a breakpoint (e.g., Tailwind's 'sm')
const useBreakpoint = (breakpointValue = 640) => {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpointValue : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsAboveBreakpoint(window.innerWidth >= breakpointValue);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpointValue]);

  return isAboveBreakpoint;
};


const AIAdvisor = ({ selectedCourse, closeModal }) => {
  const isSmAndUp = useBreakpoint(640);

  const [messages, setMessages] = useState([]); // Initialize with empty array
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Effect to set the initial welcome message when selectedCourse is available or changes
  useEffect(() => {
    if (selectedCourse && selectedCourse.course) {
      setMessages([
        {
          id: Date.now(), // Use a dynamic ID
          text: `Greetings! I am your ${selectedCourse.course} CampusLink Advisor. I can illuminate your path regarding:\n• Celestial Cutoffs (Points)\n• Galactic Career Trajectories\n• University Constellations (Comparisons)\n• Stellar Course Requirements`,
          sender: 'ai'
        }
      ]);
      setInput(''); // Clear input when a new course is selected/modal opens
    } else {
      setMessages([]); // Clear messages if no course is selected
    }
  }, [selectedCourse]); // Re-run when selectedCourse changes

  const handleSend = () => {
    if (!input.trim() || !selectedCourse) return; // Added check for selectedCourse

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const uni1Cutoff = selectedCourse?.universities?.[0]?.cutoff || "N/A";
      const uni2Cutoff = selectedCourse?.universities?.[1]?.cutoff || "N/A";
      const careerPathsText = selectedCourse?.careerPaths?.join(', ') || 'explorers in diverse industries';
      const uni1Fees = selectedCourse?.universities?.[0]?.fees || "N/A";
      const uni2Fees = selectedCourse?.universities?.[1]?.fees || "N/A";
      const durationText = selectedCourse?.duration || "an enlightening";
      const demandText = selectedCourse?.demand || "significant";

      const responses = {
        "cutoff": `The celestial alignment for ${selectedCourse.course} typically requires between ${uni1Cutoff} and ${uni2Cutoff} points. Top voyagers often score A- or higher.`,
        "career": `Graduates of ${selectedCourse.course} often embark on galactic careers as ${careerPathsText}. The success rate for employment is over 90% within 6 stellar months of graduation.`,
        "fees": `The cosmic investment for annual tuition ranges from ${uni1Fees} to ${uni2Fees}. Many star systems (universities) offer scholarships and financial nebulas (aid).`,
        "default": `${selectedCourse.course} is a ${durationText} odyssey with ${demandText} demand across the cosmos. The curriculum charts both theoretical galaxies and practical star-mapping.`
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

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Animation for the modal to "float" in the center
  const floatingModalAnimation = {
    initial: { opacity: 0, scale: 0.90, y: 10 }, // Start slightly scaled down and below center
    animate: { opacity: 1, scale: 1, y: 0 },    // Animate to full scale and centered
    exit:    { opacity: 0, scale: 0.90, y: 10 }, // Exit similarly
    transition: { 
      type: "tween", 
      ease: [0.22, 1, 0.36, 1], // Sharp, responsive custom Bézier curve
      duration: 0.4             // Quick duration
    }
  };
  
  if (!selectedCourse) { // Don't render if no course is selected yet
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{duration: 0.3}} // Backdrop fade
        // Backdrop: Always center content, consistent padding
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-lg"
      >
        <motion.div
          initial={floatingModalAnimation.initial}
          animate={floatingModalAnimation.animate}
          exit={floatingModalAnimation.exit}
          transition={floatingModalAnimation.transition}
          // Dialog: Floating effect with margins, consistent rounding and border
          className="relative w-full max-w-[90vw] sm:max-w-md md:max-w-lg h-auto max-h-[90vh] sm:max-h-[85vh] bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/40 flex flex-col border border-indigo-700/50 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-indigo-700/50 flex items-center justify-between bg-black/30 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0"> {/* Added min-w-0 for text truncation */}
              <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-lg flex-shrink-0">
                <Sparkles className="text-yellow-300" size={isSmAndUp ? 24 : 20} />
              </div>
              <div className="min-w-0"> {/* Added min-w-0 for text truncation */}
                <h3 className="font-bold text-md sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 truncate">
                  {selectedCourse.course} CampusLink Advisor
                </h3>
                <p className="text-xs text-indigo-300/70 truncate">Making sense of your studies</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal}
              className="p-1.5 rounded-full text-indigo-300/70 hover:bg-indigo-700/50 hover:text-indigo-100 transition-colors flex-shrink-0 ml-2"
              aria-label="Close advisor"
            >
              <X size={isSmAndUp ? 22 : 20} />
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
                  <div className="p-1.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full self-start shadow-md flex-shrink-0">
                    <Sparkles className="text-yellow-300" size={isSmAndUp ? 18 : 16} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-3.5 shadow-md text-xs sm:text-sm ${msg.sender === 'ai'
                    ? 'bg-indigo-800/70 text-indigo-100 rounded-2xl rounded-bl-md backdrop-blur-sm border border-indigo-600/30'
                    : 'bg-gradient-to-br from-pink-600 to-purple-700 text-white rounded-2xl rounded-br-md'}`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={`${i > 0 ? 'mt-1.5 sm:mt-2' : ''} leading-relaxed break-words`}>{line}</p>
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
                 <div className="p-1.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full self-start shadow-md flex-shrink-0">
                    <Sparkles className="text-yellow-300" size={isSmAndUp ? 18 : 16} />
                  </div>
                <div className="p-3 bg-indigo-800/70 rounded-2xl rounded-bl-md w-20 sm:w-24 border border-indigo-600/30">
                  <div className="flex space-x-1 sm:space-x-1.5 justify-center items-center h-4 sm:h-5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div 
            className="p-3 sm:p-4 border-t border-indigo-700/50 bg-slate-900/50 flex-shrink-0 pb-[calc(theme(spacing.3)+env(safe-area-inset-bottom))] sm:pb-[calc(theme(spacing.4)+env(safe-area-inset-bottom))]"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder={`Ask the stars...`}
                className="w-full p-3 pl-3 sm:pl-4 pr-10 sm:pr-12 bg-indigo-950/70 text-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 border border-indigo-700/50 placeholder-indigo-400/60 text-sm sm:text-base"
                aria-label="Ask about this course"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-lg text-purple-400 hover:text-yellow-300 disabled:text-indigo-500/50 transition-colors"
                aria-label="Send message"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send size={isSmAndUp ? 20 : 18} />
              </motion.button>
            </div>
            <p className="mt-2 text-xs text-indigo-400/60 text-center hidden sm:block">
              Try: cutoffs, career trajectories, or university comparisons
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAdvisor;