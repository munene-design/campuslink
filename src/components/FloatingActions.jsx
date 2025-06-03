import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaRobot } from "react-icons/fa";
import ChatbotPopup from "./ChatbotPopup"; // Assuming this component exists

const FloatingActions = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Animate in after component mounts
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100); // Short delay to ensure proper animation trigger
    return () => clearTimeout(timer);
  }, []);

  const buttons = [
    {
      id: "chatbot",
      label: "Chat with Us",
      Icon: FaRobot,
      action: () => setIsChatbotOpen(true),
      colors: {
        bg: "bg-gradient-to-br from-purple-500 to-indigo-600",
        hoverBg: "hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-700",
        shadow: "shadow-[0_6px_18px_rgba(124,58,237,0.35)]", // Adjusted shadow
        hoverShadow: "hover:shadow-[0_10px_30px_rgba(124,58,237,0.5)]", // Enhanced hover shadow
        tooltipBg: "bg-gradient-to-r from-purple-500 to-indigo-600",
        focusRing: "focus-visible:ring-purple-400",
      },
      iconColor: "text-purple-100", // Softer base icon color
      iconHoverColor: "group-hover:text-white group-focus-within:text-white",
    },
    {
      id: "whatsapp",
      label: "WhatsApp Support",
      Icon: FaWhatsapp,
      href: "https://wa.me/254705290655",
      colors: {
        bg: "bg-gradient-to-br from-green-400 to-teal-500",
        hoverBg: "hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600",
        shadow: "shadow-[0_6px_18px_rgba(16,185,129,0.35)]",
        hoverShadow: "hover:shadow-[0_10px_30px_rgba(16,185,129,0.5)]",
        tooltipBg: "bg-gradient-to-r from-green-400 to-teal-500",
        focusRing: "focus-visible:ring-green-300",
      },
      iconColor: "text-green-100",
      iconHoverColor: "group-hover:text-white group-focus-within:text-white",
    },
  ];

  return (
    <>
      <div
        className={`fixed bottom-8 right-8 flex flex-col items-end gap-4 z-50 transition-all duration-700 ease-out ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {buttons.map(({ id, label, Icon, href, action, colors, iconColor, iconHoverColor }, index) => (
          <div
            key={id}
            // Staggered animation for individual buttons
            className={`group relative transition-all duration-300 ease-out ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: isMounted ? `${index * 100 + 300}ms` : "0ms" }} // Stagger starts after main container animation
          >
            {/* Tooltip */}
            <div
              className={`absolute right-full mr-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
                          group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-x-0
                          translate-x-3 pointer-events-none z-20
                          transition-all duration-300 ease-in-out delay-100
                          text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg
                          ${colors.tooltipBg}`}
            >
              {label}
              {/* Tooltip Arrow */}
              <div className={`absolute top-1/2 -translate-y-1/2 -right-[3px] w-2 h-2 transform rotate-45 ${colors.tooltipBg}`} />
            </div>

            {/* Button Wrapper for focus ring and main element */}
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-14 h-14 rounded-xl
                            ${colors.bg} ${colors.shadow}
                            ${colors.hoverBg} ${colors.hoverShadow}
                            hover:scale-110 group-focus-within:scale-110
                            focus-visible:outline-none focus-visible:ring-4 ${colors.focusRing} focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 
                            transition-all duration-300 ease-in-out transform`}
                aria-label={label}
              >
                <Icon className={`text-2xl z-10 transition-all duration-300 ease-in-out transform 
                                 ${iconColor} ${iconHoverColor}
                                 group-hover:scale-110 group-hover:rotate-[12deg]
                                 group-focus-within:scale-110 group-focus-within:rotate-[12deg]`}
                />
              </a>
            ) : (
              <button
                onClick={action}
                className={`flex items-center justify-center w-14 h-14 rounded-xl
                            ${colors.bg} ${colors.shadow}
                            ${colors.hoverBg} ${colors.hoverShadow}
                            hover:scale-110 group-focus-within:scale-110
                            focus-visible:outline-none focus-visible:ring-4 ${colors.focusRing} focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 
                            transition-all duration-300 ease-in-out transform`}
                aria-label={label}
              >
                <Icon className={`text-2xl z-10 transition-all duration-300 ease-in-out transform
                                 ${iconColor} ${iconHoverColor}
                                 group-hover:scale-110 group-hover:rotate-[12deg]
                                 group-focus-within:scale-110 group-focus-within:rotate-[12deg]`}
                />
              </button>
            )}
          </div>
        ))}
      </div>

      <ChatbotPopup isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
};

export default FloatingActions;