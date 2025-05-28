// src/pages/Results.jsx
import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BookOpen, MessageCircle, Search } from 'lucide-react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AIAdvisor from './AIAdvisor'; // Import the new component


const dummyResultsData = [
  { course: "Medicine", emoji: "🩺", universities: [{ name: "University of Nairobi", code: "124513", cutoff: "42.7" }, { name: "Moi University", code: "125617", cutoff: "41.5" }] },
  { course: "Law", emoji: "⚖", universities: [{ name: "Kenyatta University", code: "124789", cutoff: "39.2" }, { name: "Strathmore University", code: "126212", cutoff: "40.0" }] },
  { course: "Engineering", emoji: "🛠", universities: [{ name: "JKUAT", code: "125934", cutoff: "43.0" }, { name: "Technical University of Kenya", code: "124999", cutoff: "41.8" }] },
  { course: "Computer Science", emoji: "💻", universities: [{ name: "Maseno University", code: "126001", cutoff: "39.6" }, { name: "Kabarak University", code: "125855", cutoff: "38.9" }] },
  { course: "Architecture", emoji: "🏛", universities: [{ name: "University of Nairobi", code: "124513", cutoff: "42.0" }, { name: "TUK", code: "124999", cutoff: "40.5" }] },
  { course: "Education", emoji: "📚", universities: [{ name: "Egerton University", code: "124320", cutoff: "37.2" }, { name: "Kenyatta University", code: "124789", cutoff: "36.5" }] },
  { course: "Nursing", emoji: "💉", universities: [{ name: "Moi University", code: "125617", cutoff: "40.8" }, { name: "JKUAT", code: "125934", cutoff: "41.0" }] },
  { course: "Actuarial Science", emoji: "📈", universities: [{ name: "Maseno University", code: "126001", cutoff: "39.4" }, { name: "Strathmore University", code: "126212", cutoff: "41.0" }] },
  { course: "Finance", emoji: "💰", universities: [{ name: "University of Nairobi", code: "124513", cutoff: "38.3" }, { name: "KCA University", code: "125400", cutoff: "37.0" }] },
  { course: "Journalism", emoji: "📰", universities: [{ name: "Multimedia University", code: "126300", cutoff: "36.0" }, { name: "Daystar University", code: "126099", cutoff: "35.8" }] },
];

const CourseCard = memo(({ result, index, setSelectedCourse }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{
        scale: 1.03,
        // A more complex shadow for depth:
        boxShadow: '0px 15px 35px -5px rgba(0, 0, 0, 0.15), 0px 8px 15px -10px rgba(0, 0, 0, 0.1)',
      }}
      className="group rounded-2xl bg-white dark:bg-gray-800 p-6 overflow-hidden relative transition-all duration-300 ease-out border border-gray-200 dark:border-gray-700/50"
      role="article"
      aria-label={`Course card for ${result.course}`}
    >
      {/* Optional: Subtle decorative gradient glow on hover (absolute positioned) */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-teal-400/10"></div>

      <div className="relative z-10"> {/* Content above the glow */}
        <div className="flex items-start gap-4 mb-5">
          <div className="mt-1 p-3 bg-teal-100 dark:bg-teal-700/50 rounded-xl text-3xl">
            {result.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              {result.course}
            </h3>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">University Options Available</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
            Offered by
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
            {result.universities.slice(0, 2).map((uni, i) => ( // Show only top 2 for brevity, or more if design allows
              <li key={uni.code || i} className="flex justify-between items-center">
                <span className="truncate pr-2">
                  {uni.name} <span className="text-gray-400 dark:text-gray-500 text-xs">({uni.code})</span>
                </span>
                <span className="whitespace-nowrap font-semibold text-sm text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20 px-2 py-0.5 rounded-full">
                  {uni.cutoff}
                </span>
              </li>
            ))}
            {result.universities.length > 2 && (
                 <li className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                    + {result.universities.length - 2} more universit{result.universities.length - 2 > 1 ? 'ies' : 'y'}
                 </li>
            )}
          </ul>
        </div>

        <motion.button
          onClick={() => setSelectedCourse(result)}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-offset-gray-800 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-teal-500/30"
          aria-label={`More information about ${result.course}`}
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <MessageCircle className="w-4 h-4" />
          Explore Details
        </motion.button>
      </div>
    </motion.div>
  );
});

CourseCard.propTypes = {
  result: PropTypes.shape({
    course: PropTypes.string.isRequired,
    emoji: PropTypes.string,
    universities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        cutoff: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setSelectedCourse: PropTypes.func.isRequired,
};

const Results = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const printRef = useRef();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setCourses(dummyResultsData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load courses. Please try again.');
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const filteredCourses = useMemo(() => {
    let filtered = courses.filter(
      (result) =>
        result.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.universities.some(
          (uni) =>
            uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.code.includes(searchQuery)
        )
    );

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.course.localeCompare(b.course);
      } else {
        const aCutoff = parseFloat(a.universities[0]?.cutoff || 0);
        const bCutoff = parseFloat(b.universities[0]?.cutoff || 0);
        return bCutoff - aCutoff;
      }
    });

    return filtered;
  }, [courses, searchQuery, sortBy]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    return filteredCourses.slice(startIndex, startIndex + coursesPerPage);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleDownloadStyledPDF = async () => {
    try {
      setIsDownloading(true);
      const input = printRef.current;
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      if (pdfHeight > pageHeight) {
        const ratio = pageHeight / pdfHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight * ratio);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      pdf.save('matched_courses_styled.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-orange-300 to-yellow-300 dark:from-teal-600 dark:via-orange-500 dark:to-yellow-500 px-4 py-16 relative overflow-hidden font-poppins">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold text-center text-teal-900 dark:text-teal-100 mb-8 tracking-tight"
        >
          <BookOpen className="inline-block w-10 h-10 mr-3 text-orange-500 dark:text-orange-400" size={40} />
          Matched Courses
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <div className="relative w-full max-w-md">
            <label htmlFor="course-search" className="sr-only">
              Search courses or universities
            </label>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 dark:text-teal-400"
              size={20}
            />
            <input
              id="course-search"
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search courses or universities..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/80 dark:bg-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400 text-teal-900 dark:text-teal-100"
              aria-label="Search courses or universities"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400 text-teal-900 dark:text-teal-100"
            aria-label="Sort courses"
          >
            <option value="name">Sort by Name</option>
            <option value="cutoff">Sort by Cutoff</option>
          </select>
        </motion.div>

        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-600 dark:text-red-400 col-span-full">{error}</p>
        ) : paginatedCourses.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">No courses found matching your search.</p>
        ) : (
          <div ref={printRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourses.map((result, index) => (
              <CourseCard key={result.course} result={result} index={index} setSelectedCourse={setSelectedCourse} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-full ${
                  page === currentPage
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-teal-900 dark:text-teal-100'
                } hover:bg-teal-400 dark:hover:bg-teal-600 transition`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadStyledPDF}
            disabled={isDownloading}
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-orange-500 hover:from-orange-500 hover:to-teal-500 dark:from-teal-600 dark:to-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 ${
              isDownloading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Download PDF of matched courses"
          >
            {isDownloading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z" />
              </svg>
            ) : (
              <Download className="w-5 h-5" size={20} />
            )}
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowApplyPopup(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 dark:from-orange-600 dark:to-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
            aria-label="How to apply for courses"
          >
            <BookOpen className="w-5 h-5" size={20} />
            How to Apply
          </motion.button>
        </div>

        <div className="flex flex-col items-center mt-12 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-300 max-w-lg text-base">
            Need help with the application process? Reach out to our support team for assistance.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:support@universityapp.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-200 to-orange-200 dark:from-teal-700 dark:to-orange-700 text-teal-800 dark:text-teal-100 font-semibold shadow-md transition-all duration-300"
            aria-label="Contact support team"
          >
            <svg className="h-5 w-5 text-teal-600 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0m0 0a9 9 0 0112.728 0zM12 8v4m0 4h.01" />
            </svg>
            Contact Support
          </motion.a>
        </div>
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <AIAdvisor
            selectedCourse={selectedCourse}
            closeModal={() => setSelectedCourse(null)}
            messages={messages}
            setMessages={setMessages}
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showApplyPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            role="dialog"
            aria-label="How to apply on KUCCPS guide"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-[5px_5px_10px_#d1d5db,-5px_-5px_10px_#ffffff] dark:shadow-none border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => setShowApplyPopup(false)}
                className="absolute top-4 right-4 text-2xl text-teal-700 dark:text-teal-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
                aria-label="Close application guide"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h2 className="text-2xl font-bold text-teal-900 dark:text-teal-100 mb-4">How to Apply on KUCCPS</h2>
              <div className="text-gray-800 dark:text-gray-200 space-y-4">
                <p>Follow these steps to apply for courses through the Kenya Universities and Colleges Central Placement Service (KUCCPS):</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Visit the official KUCCPS portal at <a href="https://www.kuccps.ac.ke" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">www.kuccps.ac.ke</a>.</li>
                  <li>Create an account or log in using your KCSE index number and password.</li>
                  <li>Select your preferred courses and universities based on your results and cut-off points.</li>
                  <li>Submit your application before the deadline and pay the required application fee.</li>
                  <li>Check your application status regularly for updates on placement.</li>
                </ol>
                <p>For more details, contact KUCCPS support or visit their official website.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowApplyPopup(false)}
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
                  aria-label="Close application guide"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Results;