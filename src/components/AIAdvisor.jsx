import React from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

const AIAdvisor = ({
  selectedCourse,
  closeModal,
  messages,
  setMessages,
  currentInput,
  setCurrentInput,
}) => {
  const handleSend = () => {
    if (!currentInput.trim()) return;

    const userMessage = { sender: 'user', text: currentInput.trim() };
    const aiReply = {
      sender: 'ai',
      text: `Thanks for your question! Regarding "${currentInput.trim()}", here's what you should know...`,
    };

    setMessages((prev) => [...prev, userMessage, aiReply]);
    setCurrentInput('');
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full p-6 relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white hover:text-red-400 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2">
          {selectedCourse.emoji} {selectedCourse.course}
        </h3>
        <p className="text-sm text-white/80 mb-4">
          Curious about <strong>{selectedCourse.course}</strong>? Ask your question below to get personalized insights from our AI assistant.
        </p>

        <div className="space-y-3">
          <div className="bg-white/90 p-3 h-48 overflow-y-auto rounded-xl shadow-inner text-sm text-gray-800 border border-purple-200 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'bg-indigo-100 text-indigo-800 self-end ml-auto'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-white/90 text-sm text-gray-800 placeholder:text-gray-500 border-none rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-2 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIAdvisor;