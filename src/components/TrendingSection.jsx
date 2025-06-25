 import React, { useState, useEffect } from 'react';

import { motion, useAnimation, useMotionValue } from 'framer-motion';

import { trendingCourses } from '../data/courseData';

import { FiChevronLeft, FiChevronRight, FiStar, FiClock } from 'react-icons/fi';







const TrendingSection = () => {

  const [isHovered, setIsHovered] = useState(false);

  const controls = useAnimation();

  const x = useMotionValue(0);



  const cardWidth = 320;

  const gap = 32;

  const cardAndGapWidth = cardWidth + gap;

  const totalRealCards = trendingCourses.length;

  const loopPoint = -cardAndGapWidth * totalRealCards;

  const dragConstraint = -cardAndGapWidth * (totalRealCards * 2);



  useEffect(() => {

    const startScroll = () => {

      const scrollSpeed = 40;

      const distance = 20000;

      const duration = distance / scrollSpeed;

      controls.start({

        x: -distance,

        transition: { duration, ease: 'linear' },

      });

    };

    if (!isHovered) startScroll();

    else controls.stop();

  }, [isHovered, controls]);



  const handleNext = () => {

    controls.stop();

    controls.start({

      x: x.get() - cardAndGapWidth * 2,

      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },

    });

  };



  const handlePrev = () => {

    controls.stop();

    const newX = Math.min(x.get() + cardAndGapWidth * 2, 0);

    controls.start({

      x: newX,

      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },

    });

  };



  return (

    <section className="relative w-full bg-gray-900 text-white py-20 md:py-28 font-sans overflow-hidden">

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/50 rounded-full filter blur-3xl animate-blob"></div>

        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/50 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/50 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>



        <div className="relative z-10 container mx-auto">

            <div className="text-center mb-16 px-4">

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">

                Discover What's Next

            </h2>

           

            <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">

                Tap a card to reveal details. Explore our most popular and in-demand courses.

            </p>

            </div>



            <div

            className="relative"

            onMouseEnter={() => setIsHovered(true)}

            onMouseLeave={() => setIsHovered(false)}

            >

            <motion.div

                className="flex gap-x-8 cursor-grab"

                style={{ x }}

                animate={controls}

                drag="x"

                dragConstraints={{ right: 0, left: dragConstraint }}

                dragElastic={0.05}

                whileTap={{ cursor: 'grabbing' }}

                onUpdate={(latest) => {

                if (latest.x <= loopPoint) {

                    x.set(latest.x % loopPoint);

                }

                }}

            >

                {[...trendingCourses, ...trendingCourses, ...trendingCourses].map((course, index) => (

                <CourseCard key={`${course.id}-${index}`} course={course} />

                ))}

            </motion.div>



            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />

            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />

           

            <div className={`absolute top-0 left-0 h-full w-full pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>

                <button

                onClick={handlePrev}

                className="pointer-events-auto absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 active:scale-100 transition-all duration-200"

                >

                <FiChevronLeft className="h-6 w-6 text-white" />

                </button>

                <button

                onClick={handleNext}

                className="pointer-events-auto absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 active:scale-100 transition-all duration-200"

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



  return (

    <motion.div

      className="flex-shrink-0 w-[320px] h-[420px] rounded-2xl"

      style={{ perspective: '1200px' }}

      onMouseEnter={() => setIsFlipped(true)}

      onMouseLeave={() => setIsFlipped(false)}

      onTap={() => setIsFlipped(!isFlipped)}

    >

      <motion.div

        className="relative w-full h-full"

        style={{ transformStyle: 'preserve-3d' }}

        transition={{ duration: 0.7 }}

        animate={{ rotateY: isFlipped ? 180 : 0 }}

      >

        {/* Card Front */}

        <div

          className="absolute w-full h-full bg-cover bg-center rounded-2xl shadow-xl overflow-hidden"

          style={{ backgroundImage: `url(${course.imageUrl})`, backfaceVisibility: 'hidden' }}

        >

          <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">

            <h3 className="text-2xl font-bold text-white leading-tight">{course.courseName}</h3>

            <p className="text-lg text-gray-200">{course.universityName}</p>

          </div>

        </div>



        {/* Card Back */}

        <div

          className="absolute w-full h-full bg-cover bg-center rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col justify-between"

          style={{

            backgroundImage: `url(${course.imageUrl})`,

            transform: 'rotateY(180deg)',

            backfaceVisibility: 'hidden',

          }}

        >

            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl"></div>

            <div className="relative z-10 flex flex-col h-full">

                <div>

                    <span className="text-xs font-semibold bg-green-200 text-green-800 px-3 py-1 rounded-full">{course.trendLabel}</span>

                    <h3 className="text-xl font-bold text-gray-900 mt-4">{course.courseName}</h3>

                    <p className="text-md text-gray-700 font-semibold">{course.universityName} <span className="font-light">({course.universityCode})</span></p>

                </div>



                <div className="mt-auto border-t border-gray-400/50 pt-4 space-y-3">

                    <p className="flex items-center text-md text-gray-800"><FiStar className="mr-3 text-purple-600"/> <span className="font-semibold">Grade:</span>&nbsp;{course.entryGrade}</p>

                    <p className="flex items-center text-md text-gray-800"><FiClock className="mr-3 text-purple-600"/> <span className="font-semibold">Duration:</span>&nbsp;{course.duration}</p>

                </div>

                 <a href="#learn-more" className="relative z-10 mt-4 text-center bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors w-full">Learn More</a>

            </div>

        </div>

      </motion.div>

    </motion.div>

  );

};





export default TrendingSection;