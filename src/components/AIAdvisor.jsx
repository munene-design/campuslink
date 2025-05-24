import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, Send } from 'lucide-react';

const AICourseAdvisor = ({ course, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm your course advisor for ${course.course}. Ask me anything about career paths, cutoffs, or university comparisons.`,
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Mock AI response - replace with real API call
    setTimeout(() => {
      const aiResponses = [
        `For ${course.course}, the average starting salary is KES 120,000. ${course.universities[0].name} has particularly strong industry connections.`,
        `The cutoff points for ${course.course} have been stable around ${course.universities[0].cutoff} for the past 3 years.`,
        `Did you know ${course.course} graduates have a 92% employment rate within 6 months?`
      ];
      const aiMessage = { 
        id: Date.now(), 
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          className="relative w-full max-w-md h-[80vh] bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <Bot className="text-indigo-600 dark:text-indigo-300" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {course.course} Advisor
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'ai' 
                    ? 'bg-indigo-50 dark:bg-gray-700 rounded-tl-none' 
                    : 'bg-indigo-600 text-white rounded-tr-none'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-indigo-50 dark:bg-gray-700 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask about ${course.course}...`}
                className="w-full p-3 pr-12 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-3 top-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                <Send />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <Sparkles size={14} />
              AI-powered course advisor
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};