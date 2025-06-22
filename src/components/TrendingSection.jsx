import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { trendingCourses } from '../data/courseData'; // Assuming your data is in this path
import { FiChevronLeft, FiChevronRight, FiStar, FiClock, FiTrendingUp } from 'react-icons/fi';

// A constant for the delay before autoscroll resumes
const AUTOSCROLL_RESUME_DELAY = 5000; // 5 seconds

const TrendingSection = () => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const autoScrollResumeTimer = useRef(null);

  // --- Carousel Dimensions ---
  const cardWidth = 320;
  const gap = 32;
  const cardAndGapWidth = cardWidth + gap;
  const totalRealCards = trendingCourses.length;
  const loopPoint = -cardAndGapWidth * totalRealCards;
  // We triple the cards for a seamless loop
  const dragConstraint = -cardAndGapWidth * (totalRealCards * 2);

  // --- Autoscroll Logic ---
  const startAutoScroll = useCallback(() => {
    // This function calculates remaining distance and starts the linear scroll
    const currentX = x.get();
    const remainingDistance = dragConstraint - (currentX % dragConstraint);
    const scrollSpeed = 40; // pixels per second
    const duration = Math.abs(remainingDistance / scrollSpeed);

    controls.start({
      x: dragConstraint,
      transition: { duration, ease: 'linear' },
    });
  }, [controls, x, dragConstraint]);

  const resumeAutoScroll = useCallback(() => {
    // A debounced function to resume scrolling after a delay
    clearTimeout(autoScrollResumeTimer.current);
    autoScrollResumeTimer.current = setTimeout(startAutoScroll, AUTOSCROLL_RESUME_DELAY);
  }, [startAutoScroll]);

  const handleInteraction = useCallback(() => {
    // A single function to handle any user interaction
    controls.stop();
    clearTimeout(autoScrollResumeTimer.current);
    resumeAutoScroll();
  }, [controls, resumeAutoScroll]);

  useEffect(() => {
    // Start scrolling on initial mount
    startAutoScroll();
    return () => clearTimeout(autoScrollResumeTimer.current); // Cleanup on unmount
  }, [startAutoScroll]);


  // --- Navigation Button Handlers ---
  const handleNext = () => {
    handleInteraction(); // Treat button click as an interaction
    const newX = x.get() - cardAndGapWidth * 2;
    controls.start({
      x: newX < dragConstraint ? newX % loopPoint : newX,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    });
  };

  const handlePrev = () => {
    handleInteraction(); // Treat button click as an interaction
    const newX = Math.min(x.get() + cardAndGapWidth * 2, 0);
    controls.start({
      x: newX,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    });
  };

  return (
    <section className="relative w-full bg-gray-900 text-white py-20 md:py-28 font-sans overflow-hidden">
        {/* Background Blobs - They are great, no changes needed */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/50 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/50 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/50 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        <div className="relative z-10 container mx-auto">
            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
                    Discover What's Next
                </h2>
                <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
                    Hover or tap a card to see details. The carousel will resume scrolling automatically.
                </p>
            </div>

            {/* Carousel Container - now a "group" for hover effects */}
            <div className="relative group" onMouseEnter={handleInteraction} onMouseLeave={resumeAutoScroll}>
                <motion.div
                    className="flex gap-x-8 cursor-grab"
                    style={{ x }}
                    animate={controls}
                    drag="x"
                    dragConstraints={{ right: 0, left: dragConstraint }}
                    dragElastic={0.05}
                    whileTap={{ cursor: 'grabbing' }}
                    onDragStart={handleInteraction}
                    onDragEnd={resumeAutoScroll}
                    onUpdate={(latest) => {
                        // The seamless loop logic
                        if (latest.x <= loopPoint) {
                            x.set(latest.x % loopPoint);
                        }
                    }}
                >
                    {[...trendingCourses, ...trendingCourses, ...trendingCourses].map((course, index) => (
                        <CourseCard key={`${course.id}-${index}`} course={course} />
                    ))}
                </motion.div>

                {/* Left/Right Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
                
                {/* Navigation Buttons - now appear on group hover */}
                <div className="absolute top-0 left-0 h-full w-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handlePrev}
                        className="pointer-events-auto absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 active:scale-100 transition-all duration-200"
                    >
                        <FiChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="pointer-events-auto absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 active:scale-100 transition-all duration-200"
                    >
                        <FiChevronRight className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};


const CourseCard = ({ course }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Card interaction now also triggers flip on tap for mobile
  const handleCardInteraction = () => setIsFlipped(v => !v);

  return (
    <motion.div
      className="flex-shrink-0 w-[320px] h-[420px] rounded-2xl cursor-pointer"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTap={handleCardInteraction}
      whileHover={{ scale: 1.03, y: -5 }} // DESIGN: Added subtle lift and scale on hover
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative w-full h-full shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.6 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Card Front */}
        <div
          className="absolute w-full h-full bg-cover bg-center rounded-2xl overflow-hidden"
          style={{ backgroundImage: `url(${course.imageUrl})`, backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white leading-tight shadow-md">{course.courseName}</h3>
            <p className="text-lg text-gray-200">{course.universityName}</p>
          </div>
        </div>

        {/* Card Back (IMPROVED DESIGN) */}
        <div
          className="absolute w-full h-full bg-cover bg-center rounded-2xl overflow-hidden p-6 flex flex-col"
          style={{
            backgroundImage: `url(${course.imageUrl})`,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl"></div>
            <div className="relative z-10 flex flex-col h-full text-gray-800">
                <div className="flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-purple-700">{course.universityCode}</p>
                        <span className="flex items-center text-xs font-semibold bg-green-200 text-green-800 px-3 py-1 rounded-full">
                            <FiTrendingUp className="mr-1.5" /> {course.trendLabel}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-3">{course.courseName}</h3>
                    <p className="text-md font-semibold text-gray-600">{course.universityName}</p>
                </div>

                <div className="flex-grow my-6 border-t border-gray-400/50" />

                <div className="flex-shrink-0 space-y-4">
                    <p className="flex items-center text-md">
                        <FiStar className="mr-3 h-5 w-5 text-purple-600"/> 
                        <span className="font-semibold mr-2">Grade:</span> {course.entryGrade}
                    </p>
                    <p className="flex items-center text-md">
                        <FiClock className="mr-3 h-5 w-5 text-purple-600"/> 
                        <span className="font-semibold mr-2">Duration:</span> {course.duration}
                    </p>
                </div>
                 <a href="#learn-more" className="relative z-10 mt-auto text-center bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg w-full">Learn More</a>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrendingSection;
                   import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { trendingCourses } from '../data/courseData'; // Assuming your data is in this path
import { FiChevronLeft, FiChevronRight, FiStar, FiClock, FiTrendingUp } from 'react-icons/fi';

// A constant for the delay before autoscroll resumes
const AUTOSCROLL_RESUME_DELAY = 5000; // 5 seconds

const TrendingSection = () => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const autoScrollResumeTimer = useRef(null);

  // --- Carousel Dimensions ---
  const cardWidth = 320;
  const gap = 32;
  const cardAndGapWidth = cardWidth + gap;
  const totalRealCards = trendingCourses.length;
  const loopPoint = -cardAndGapWidth * totalRealCards;
  // We triple the cards for a seamless loop
  const dragConstraint = -cardAndGapWidth * (totalRealCards * 2);

  // --- Autoscroll Logic ---
  const startAutoScroll = useCallback(() => {
    // This function calculates remaining distance and starts the linear scroll
    const currentX = x.get();
    const remainingDistance = dragConstraint - (currentX % dragConstraint);
    const scrollSpeed = 40; // pixels per second
    const duration = Math.abs(remainingDistance / scrollSpeed);

    controls.start({
      x: dragConstraint,
      transition: { duration, ease: 'linear' },
    });
  }, [controls, x, dragConstraint]);

  const resumeAutoScroll = useCallback(() => {
    // A debounced function to resume scrolling after a delay
    clearTimeout(autoScrollResumeTimer.current);
    autoScrollResumeTimer.current = setTimeout(startAutoScroll, AUTOSCROLL_RESUME_DELAY);
  }, [startAutoScroll]);

  const handleInteraction = useCallback(() => {
    // A single function to handle any user interaction
    controls.stop();
    clearTimeout(autoScrollResumeTimer.current);
    resumeAutoScroll();
  }, [controls, resumeAutoScroll]);

  useEffect(() => {
    // Start scrolling on initial mount
    startAutoScroll();
    return () => clearTimeout(autoScrollResumeTimer.current); // Cleanup on unmount
  }, [startAutoScroll]);


  // --- Navigation Button Handlers ---
  const handleNext = () => {
    handleInteraction(); // Treat button click as an interaction
    const newX = x.get() - cardAndGapWidth * 2;
    controls.start({
      x: newX < dragConstraint ? newX % loopPoint : newX,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    });
  };

  const handlePrev = () => {
    handleInteraction(); // Treat button click as an interaction
    const newX = Math.min(x.get() + cardAndGapWidth * 2, 0);
    controls.start({
      x: newX,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    });
  };

  return (
    <section className="relative w-full bg-gray-900 text-white py-20 md:py-28 font-sans overflow-hidden">
        {/* Background Blobs - They are great, no changes needed */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/50 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/50 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/50 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        <div className="relative z-10 container mx-auto">
            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
                    Discover What's Next
                </h2>
                <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
                    Hover or tap a card to see details. The carousel will resume scrolling automatically.
                </p>
            </div>

            {/* Carousel Container - now a "group" for hover effects */}
            <div className="relative group" onMouseEnter={handleInteraction} onMouseLeave={resumeAutoScroll}>
                <motion.div
                    className="flex gap-x-8 cursor-grab"
                    style={{ x }}
                    animate={controls}
                    drag="x"
                    dragConstraints={{ right: 0, left: dragConstraint }}
                    dragElastic={0.05}
                    whileTap={{ cursor: 'grabbing' }}
                    onDragStart={handleInteraction}
                    onDragEnd={resumeAutoScroll}
                    onUpdate={(latest) => {
                        // The seamless loop logic
                        if (latest.x <= loopPoint) {
                            x.set(latest.x % loopPoint);
                        }
                    }}
                >
                    {[...trendingCourses, ...trendingCourses, ...trendingCourses].map((course, index) => (
                        <CourseCard key={`${course.id}-${index}`} course={course} />
                    ))}
                </motion.div>

                {/* Left/Right Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
                
                {/* Navigation Buttons - now appear on group hover */}
                <div className="absolute top-0 left-0 h-full w-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handlePrev}
                        className="pointer-events-auto absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 active:scale-100 transition-all duration-200"
                    >
                        <FiChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="pointer-events-auto absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 active:scale-100 transition-all duration-200"
                    >
                        <FiChevronRight className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};


const CourseCard = ({ course }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Card interaction now also triggers flip on tap for mobile
  const handleCardInteraction = () => setIsFlipped(v => !v);

  return (
    <motion.div
      className="flex-shrink-0 w-[320px] h-[420px] rounded-2xl cursor-pointer"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTap={handleCardInteraction}
      whileHover={{ scale: 1.03, y: -5 }} // DESIGN: Added subtle lift and scale on hover
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative w-full h-full shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.6 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Card Front */}
        <div
          className="absolute w-full h-full bg-cover bg-center rounded-2xl overflow-hidden"
          style={{ backgroundImage: `url(${course.imageUrl})`, backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white leading-tight shadow-md">{course.courseName}</h3>
            <p className="text-lg text-gray-200">{course.universityName}</p>
          </div>
        </div>

        {/* Card Back (IMPROVED DESIGN) */}
        <div
          className="absolute w-full h-full bg-cover bg-center rounded-2xl overflow-hidden p-6 flex flex-col"
          style={{
            backgroundImage: `url(${course.imageUrl})`,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl"></div>
            <div className="relative z-10 flex flex-col h-full text-gray-800">
                <div className="flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-purple-700">{course.universityCode}</p>
                        <span className="flex items-center text-xs font-semibold bg-green-200 text-green-800 px-3 py-1 rounded-full">
                            <FiTrendingUp className="mr-1.5" /> {course.trendLabel}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-3">{course.courseName}</h3>
                    <p className="text-md font-semibold text-gray-600">{course.universityName}</p>
                </div>

                <div className="flex-grow my-6 border-t border-gray-400/50" />

                <div className="flex-shrink-0 space-y-4">
                    <p className="flex items-center text-md">
                        <FiStar className="mr-3 h-5 w-5 text-purple-600"/> 
                        <span className="font-semibold mr-2">Grade:</span> {course.entryGrade}
                    </p>
                    <p className="flex items-center text-md">
                        <FiClock className="mr-3 h-5 w-5 text-purple-600"/> 
                        <span className="font-semibold mr-2">Duration:</span> {course.duration}
                    </p>
                </div>
                 <a href="#learn-more" className="relative z-10 mt-auto text-center bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg w-full">Learn More</a>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrendingSection;
