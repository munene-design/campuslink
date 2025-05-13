import React, { useState } from "react";
import { FaWhatsapp, FaRobot } from "react-icons/fa";
import ChatbotPopup from "./ChatbotPopup";

const FloatingActions = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const buttons = [
    {
      id: "chatbot",
      label: "Chat with Us",
      Icon: FaRobot,
      action: () => setIsChatbotOpen(true),
      colors: {
        gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
        hoverGradient: "bg-gradient-to-r from-purple-400 to-indigo-500",
        shadow: "shadow-[0_4px_14px_rgba(124,58,237,0.5)]",
        hoverShadow: "shadow-[0_6px_20px_rgba(124,58,237,0.7)]",
      }
    },
    {
      id: "whatsapp",
      label: "WhatsApp Support",
      Icon: FaWhatsapp,
      href: "https://wa.me/254705290655",
      colors: {
        gradient: "bg-gradient-to-br from-green-400 to-teal-500",
        hoverGradient: "bg-gradient-to-r from-green-300 to-teal-400",
        shadow: "shadow-[0_4px_14px_rgba(16,185,129,0.5)]",
        hoverShadow: "shadow-[0_6px_20px_rgba(16,185,129,0.7)]",
      }
    }
  ];

  return (
    <>
      <div className="fixed bottom-8 right-8 flex flex-col gap-5 z-50">
        {buttons.map(({ id, label, Icon, href, action, colors }) => (
          <div key={id} className="group relative animate-bounce hover:animate-none">
            {/* Tooltip */}
            <div className={`absolute -left-40 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 ${colors.gradient.replace("bg-gradient-to-br", "bg-gradient-to-r")} text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg pointer-events-none`}>
              {label}
            </div>

            {/* Button */}
            <div className={`w-14 h-14 rounded-full ${colors.shadow} hover:${colors.hoverShadow} hover:scale-110 transition-all duration-300 ${colors.gradient} relative overflow-hidden group`}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <Icon className="text-2xl text-white z-10" />
                </a>
              ) : (
                <button onClick={action} className="w-full h-full flex items-center justify-center">
                  <Icon className="text-2xl text-white z-10" />
                </button>
              )}
              <div className={`absolute inset-0 ${colors.hoverGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
            </div>
          </div>
        ))}
      </div>

      {/* Chatbot Popup */}
      <ChatbotPopup isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
};

export default FloatingActions;
