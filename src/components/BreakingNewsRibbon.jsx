import { useRef } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

const updates = [
  "📢 KUCCPS Portal Opens: June 1–30, 2025",
  "🆕 New Programs Added – Explore now!",
  "🔔 Revised Cutoff Points Released – Check yours today",
];

export default function BreakingNewsRibbon() {
  const tickerRef = useRef(null);

  return (
    <div className="relative bg-red-600 text-white py-2 overflow-hidden">
     
      {/* Breaking Icon */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex items-center space-x-1">
        <BsFillExclamationTriangleFill className="text-yellow-300 animate-bounce" />
        <span className="font-bold uppercase text-sm">Breaking</span>
      </div>

      {/* Marquee Text */}
      <div
        ref={tickerRef}
        className="pl-32 whitespace-nowrap animate-ticker hover:[animation-play-state:paused] transition-all duration-300"
      >
        {updates.map((text, i) => (
          <span key={i} className="inline-block mr-10">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
