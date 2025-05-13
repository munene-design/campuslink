import React, { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatbotPopup = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "👋 Hi there! I'm CampusLink, your course-matching assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: input }]);
    setInput("");

    // Mock bot reply
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        sender: "bot",
        text: "💡 That feature is coming soon. Stay tuned!"
      }]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-8 w-80 rounded-2xl shadow-2xl border border-purple-300 bg-white/90 backdrop-blur-md flex flex-col z-50 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center p-4 rounded-t-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <h2 className="text-lg font-bold">CampusLink 🤖</h2>
        <button onClick={onClose} className="text-white hover:text-red-300">
          <FaTimes />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 max-h-96 scrollbar-thin scrollbar-thumb-purple-300">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                msg.sender === "user"
                  ? "bg-purple-100 text-purple-800 rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              } shadow`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center border-t p-3 bg-white rounded-b-2xl">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPopup;
