import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import "./FloatingActions.css"; // Custom CSS for float animation

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-5 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/254712345678"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group animate-float"
      >
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-40 blur-xl animate-ping z-0" />
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-xl hover:scale-110 transition z-10 animate-float">
  <FaWhatsapp size={26} />
</div>

      </a>

      {/* Chatbot Button */}
      <button className="relative group animate-float">
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-40 blur-xl animate-ping z-0" />
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:scale-110 transition-transform duration-300 z-10">
          <MessageCircle size={26} />
        </div>
      </button>
    </div>
  );
}

