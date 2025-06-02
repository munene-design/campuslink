import React from "react";
import { CalendarDays, Bell, Zap } from "lucide-react"; // Added Zap for potential use
import { motion } from "framer-motion";

// A simple component for subtle animated background shapes
const AnimatedBackgroundShape = ({ className, initial, animate, transition }) => (
  <motion.div
    className={`absolute opacity-50 pointer-events-none ${className}`}
    initial={initial}
    animate={animate}
    transition={transition}
  />
);

const updates = [
  {
    icon: "📣",
    text: "KUCCPS portal is now officially closed for new applications.",
    badge: "Official",
    color: "green",
  },
  {
    icon: "🛠️",
    text: "Key policy updates and guidelines for 2025 programs have been released.",
    badge: "New",
    color: "yellow",
  },
  {
    icon: "⏰",
    text: "Urgent: Final deadline for course/institution revision is approaching June 30th!",
    badge: "Urgent",
    color: "red",
  },
];

const badgeColors = {
  green: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
    hoverGlow: "hover:shadow-[0_0_15px_3px_rgba(74,222,128,0.4)]" // green-400
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-400",
    hoverGlow: "hover:shadow-[0_0_15px_3px_rgba(250,204,21,0.4)]" // yellow-400
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
    hoverGlow: "hover:shadow-[0_0_15px_3px_rgba(248,113,113,0.4)]" // red-400
  },
};

export default function UpdatesSection() {
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const titleChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    inView: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.2, 0.95] }, // Smoother ease
    },
  };

  const badgeAnimation = {
    scale: [1, 1.08, 1, 1.05, 1],
    opacity: [0.8, 1, 0.8, 1, 0.8],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-sky-100 to-blue-200 py-20 sm:py-24 px-6 overflow-hidden" id="updates"> {/* Changed section id */}
      {/* Decorative Background Shapes */}
      <AnimatedBackgroundShape
        className="bg-blue-300/50 rounded-full blur-2xl"
        initial={{ scale: 0.5, x: "-50%", y: "-50%" }}
        animate={{ scale: [0.8, 1, 0.8], x: ["-60%", "-40%", "-60%"], y: ["-60%", "-40%", "-60%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ width: "400px", height: "400px", top: "10%", left: "20%" }}
      />
      <AnimatedBackgroundShape
        className="bg-pink-300/40 rounded-xl blur-2xl"
        initial={{ scale: 0.5, x: "50%", y: "50%" }}
        animate={{ scale: [0.7, 0.9, 0.7], rotate: [0, 90, 0], x: ["60%", "40%", "60%"], y: ["60%", "40%", "60%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        style={{ width: "300px", height: "300px", top: "60%", left: "70%" }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight"
            variants={titleChildVariants}
          >
            <motion.span
              className="inline-block mr-3 text-blue-600"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.3 }}
            >
              <CalendarDays className="inline-block w-8 h-8 sm:w-10 sm:h-10" />
            </motion.span>
            Latest KUCCPS Updates
          </motion.h2>
          <motion.p
            className="text-slate-600 text-lg mb-12 sm:mb-16"
            variants={titleChildVariants}
          >
            Stay ahead with the most recent changes, deadlines, and announcements.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {updates.map((update, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              viewport={{ once: true, amount: 0.2 }} // Card animates when 20% is visible
              transition={{ delay: i * 0.15 + 0.2 }} // Stagger with a slight base delay
              className={`group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 text-left border ${badgeColors[update.color]?.border || 'border-gray-200'} 
                           hover:shadow-2xl transition-all duration-300 ease-out ${badgeColors[update.color]?.hoverGlow || ''}
                           transform hover:-translate-y-2 hover:scale-[1.02]`}
            >
              <div className="flex items-start space-x-4">
                <motion.span
                  className="text-3xl mt-1 group-hover:scale-125 group-hover:rotate-[10deg] transition-transform duration-300 ease-out"
                  aria-hidden="true"
                >
                  {update.icon}
                </motion.span>
                <div className="flex-1">
                  <p className="text-slate-800 text-base leading-relaxed font-medium mb-3">{update.text}</p>
                  <motion.span
                    animate={badgeAnimation}
                    className={`inline-block px-3.5 py-1.5 text-xs font-bold rounded-full
                      ${badgeColors[update.color]?.bg || "bg-gray-100"}
                      ${badgeColors[update.color]?.text || "text-gray-600"}
                    `}
                  >
                    {update.badge}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center items-center gap-3 text-blue-700 font-semibold text-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              rotate: [0, -12, 12, -12, 8, -8, 0],
              y: [0, -2, 0, -2, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.5,
            }}
          >
            <Bell className="w-6 h-6" />
          </motion.div>
          More important announcements are on the way!
        </motion.div>
      </div>
    </section>
  );
}