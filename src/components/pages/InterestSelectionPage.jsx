import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Lucide React Icons
import {
  Scale, Briefcase, Drama, Leaf, Cog, DraftingCompass, Laptop, Tractor, FlaskConical, Calculator,
  Scissors, Dumbbell, Stethoscope, Scroll, Carrot, Map, Languages, Music2, BookOpen, HandHelping, CheckCircle2, Users // Added Users for one example
} from 'lucide-react'; // Ensure all icons used are imported

// Updated interestData with descriptions
const interestData = [
  { name: 'Law & Justice', icon: Scale, color: 'text-purple-400', description: "Explore legal systems, rights, and societal order." },
  { name: 'Business & Hospitality', icon: Briefcase, color: 'text-sky-400', description: "Master commerce, management, and guest services." },
  { name: 'Media & Arts', icon: Drama, color: 'text-rose-400', description: "Create, express, and captivate through diverse mediums." },
  { name: 'Earth & Environment', icon: Leaf, color: 'text-emerald-400', description: "Study planetary systems and champion sustainability." },
  { name: 'Engineering', icon: Cog, color: 'text-orange-400', description: "Design, innovate, and build solutions for tomorrow." },
  { name: 'Architecture', icon: DraftingCompass, color: 'text-yellow-400', description: "Shape spaces, structures, and the built environment." },
  { name: 'Computing & Tech', icon: Laptop, color: 'text-cyan-400', description: "Dive into code, data, and digital innovation." },
  { name: 'Agribusiness', icon: Tractor, color: 'text-lime-400', description: "Cultivate, manage, and sustain food production." },
  { name: 'Science', icon: FlaskConical, color: 'text-teal-400', description: "Investigate the natural world through research." },
  { name: 'Math & Finance', icon: Calculator, color: 'text-indigo-400', description: "Analyze numbers, models, and financial markets." },
  { name: 'Fashion & Design', icon: Scissors, color: 'text-pink-400', description: "Craft aesthetics, style, and visual narratives." },
  { name: 'Sports & Fitness', icon: Dumbbell, color: 'text-red-400', description: "Excel in athletics, health, and human performance." },
  { name: 'Medicine & Health', icon: Stethoscope, color: 'text-blue-400', description: "Advance well-being through care and medical science." },
  { name: 'History & Culture', icon: Scroll, color: 'text-amber-500', description: "Uncover past events and diverse human heritage." },
  { name: 'Food & Culinary Arts', icon: Carrot, color: 'text-green-400', description: "Innovate flavors and the art of gastronomy." },
  { name: 'Geography & Planning', icon: Map, color: 'text-fuchsia-400', description: "Map the world and shape sustainable communities." },
  { name: 'Languages & Linguistics', icon: Languages, color: 'text-violet-400', description: "Connect cultures through the study of language." },
  { name: 'Music & Performing Arts', icon: Music2, color: 'text-light-blue-400', description: "Compose, perform, and move audiences." }, // Ensure light-blue is defined
  { name: 'Teaching & Education', icon: BookOpen, color: 'text-cyan-500', description: "Inspire learning and empower future generations." },
  { name: 'Philosophy & Theology', icon: HandHelping, color: 'text-gray-400', description: "Explore profound questions of existence and belief." },
];


const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.05, // Slightly faster stagger
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
  hover: {
    y: -8,
    scale: 1.04, // Slightly more scale
    boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.35)', // More pronounced shadow
    transition: { type: 'spring', stiffness: 300, damping: 10, mass: 0.7 },
  },
  tap: {
    scale: 0.96,
    y: -2,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut', delay:0.1 } }, // Delay ensures card hover animates first
};

const checkIconVariants = {
  hidden: { scale: 0.5, opacity: 0, rotate: -30 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 500, damping: 20, delay: 0.1 },
  },
  exit: { scale: 0.5, opacity: 0, rotate: 30, transition: { duration: 0.2 } }
};

// Title Shimmer Component (Optional)
const ShimmerText = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
        style={{ mixBlendMode: 'overlay' }} // Adjust blend mode for desired effect
      />
    </span>
  );
};


const InterestSelectionPage = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null); // To control description visibility
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 25, mass: 1 }; // Slightly adjusted
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], ['6deg', '-6deg']); // Slightly adjusted
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (event) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseLeaveGrid = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleInterest = (interestName) => {
    setSelectedInterests((prev) =>
      prev.includes(interestName)
        ? prev.filter((i) => i !== interestName)
        : [...prev, interestName]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 sm:py-16 px-4 relative overflow-hidden font-['Inter',_sans-serif]">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-700/25 rounded-full filter blur-[90px] sm:blur-[110px] animate-[spin_22s_linear_infinite_reverse]"></div>
        <div className="absolute bottom-[-25%] right-[-15%] w-[350px] h-[350px] sm:w-[650px] sm:h-[650px] bg-cyan-700/25 rounded-full filter blur-[100px] sm:blur-[130px] animate-[spin_28s_linear_infinite]"></div>
        <div className="absolute top-[30%] left-[25%] w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] bg-pink-700/20 rounded-full filter blur-[80px] sm:blur-[100px] animate-[spin_20s_linear_infinite]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-center mb-10 sm:mb-12 md:mb-16"
        >
          <ShimmerText className="bg-clip-text text-transparent bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400">
            Pathfinder: What Interests You?
          </ShimmerText>
        </motion.h1>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeaveGrid}
        >
          {interestData.map((item, index) => {
            const isSelected = selectedInterests.includes(item.name);
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.name}
                custom={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                onClick={() => toggleInterest(item.name)}
                onHoverStart={() => setHoveredCard(item.name)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`cursor-pointer p-4 pt-5 sm:p-5 sm:pt-6 rounded-xl sm:rounded-2xl shadow-xl border-2 transition-all duration-300 ease-out
                  relative overflow-hidden group aspect-[3/4] sm:aspect-[4/5] flex flex-col items-center text-center
                  ${
                    isSelected
                      ? `border-purple-500/80 bg-purple-600/30 backdrop-blur-xl shadow-purple-500/20` // Enhanced selected state
                      : `border-gray-700/70 bg-gray-800/75 hover:border-purple-600/60 backdrop-blur-lg`
                  }`}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              >
                {/* Optional: Animated gradient border on hover/select */}
                <AnimatePresence>
                {(isSelected || hoveredCard === item.name) && (
                    <motion.div
                        className="absolute -inset-px rounded-xl sm:rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: {duration: 0.4} }}
                        exit={{ opacity: 0, transition: {duration: 0.2} }}
                        style={{
                            backgroundImage: `linear-gradient(to bottom right, ${item.color.replace('text-','').replace('-400','')}33, ${item.color.replace('text-','').replace('-400','')}11, transparent 60%)`
                        }}
                    />
                )}
                </AnimatePresence>

                <motion.div
                  style={{transform: "translateZ(25px)"}} // Increased Z lift
                  className="relative z-10 flex flex-col items-center justify-start flex-grow w-full pt-1 sm:pt-2" // justify-start, add padding top
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: isSelected ? 0 : -5 }} transition={{type: 'spring', stiffness:300}}>
                     <IconComponent className={`${item.color} mb-2 sm:mb-3 h-8 w-8 sm:h-10 md:h-12 transition-all duration-200 ease-in-out`} strokeWidth={1.5} />
                  </motion.div>
                  <span className={`text-sm sm:text-base font-semibold text-gray-100 transition-colors duration-200 ${isSelected ? item.color : 'group-hover:text-gray-50'}`}>
                    {item.name}
                  </span>
                  <AnimatePresence>
                    {(hoveredCard === item.name || isSelected) && ( // Show description if hovered or selected
                      <motion.p
                        variants={descriptionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="text-[11px] sm:text-xs text-gray-400 group-hover:text-gray-300 mt-1.5 sm:mt-2 px-1 line-clamp-3 sm:line-clamp-2" // line-clamp might need Tailwind plugin
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      variants={checkIconVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 p-0.5 sm:p-1 bg-gray-900/70 rounded-full shadow-md"
                    >
                      <CheckCircle2 className="text-green-400 h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
                 {/* Spacer to push content up if description is not visible, maintaining some height */}
                 {!isSelected && hoveredCard !== item.name && (
                    <div className="h-[30px] sm:h-[36px] mt-1.5 sm:mt-2"></div> // Adjust height to match description space
                  )}
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {selectedInterests.length > 0 && (
            <motion.div
              className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25, mass: 0.8 }}
            >
              <motion.button
                onClick={() =>
                  navigate('/results', {
                    state: { selectedInterests: selectedInterests },
                  })
                }
                className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-2xl focus:outline-none focus:ring-4 focus:ring-opacity-50
                           bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white
                           hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600
                           focus:ring-pink-400 transform active:scale-95" // Added active:scale-95
                whileHover={{ scale: 1.08, y: -4, boxShadow: "0px 18px 35px -8px rgba(236, 72, 153, 0.45)" }} // Enhanced shadow
                whileTap={{ scale: 0.96, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                Find Your Fit
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterestSelectionPage;


