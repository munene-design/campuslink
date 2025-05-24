
import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BookOpen, MessageCircle, CheckCircle, LogIn, FileText, Sliders, Search } from 'lucide-react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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

const AIAdvisor = ({ selectedCourse, closeModal, messages, setMessages, currentInput, setCurrentInput }) => {
  const handleSend = () => {
    if (currentInput.trim()) {
      setMessages([...messages, `User: ${currentInput}`]);
      setMessages((prev) => [...prev, `AI: Info about ${selectedCourse.course}...`]); // Placeholder response
      setCurrentInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-label={`AI Advisor for ${selectedCourse.course}`}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative w-full max-w-md bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-[5px_5px_10px_#d1d5db,-5px_-5px_10px_#ffffff] dark:shadow-none border border-gray-200 dark:border-gray-700"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-teal-700 dark:text-teal-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
          aria-label="Close AI Advisor"
        >
          <span aria-hidden="true">×</span>
        </button>
        <h2 className="text-2xl font-bold text-teal-900 dark:text-teal-100 mb-4">{selectedCourse.course} Advisor</h2>
        <div className="h-64 overflow-y-auto bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          {messages.map((msg, i) => (
            <p key={i} className="text-gray-800 dark:text-gray-200">{msg}</p>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Ask about this course..."
            className="flex-1 p-2 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="Ask about this course"
          />
          <button
            onClick={handleSend}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

AIAdvisor.propTypes = {
  selectedCourse: PropTypes.shape({
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
  closeModal: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  setMessages: PropTypes.func.isRequired,
  currentInput: PropTypes.string.isRequired,
  setCurrentInput: PropTypes.func.isRequired,
};


const CourseCard = memo(({ result, index, setSelectedCourse }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    whileHover={{
      scale: 1.03, // Slightly more subtle scale
      // rotateX: 3, // Optional: more subtle rotation or remove
      // rotateY: 3, // Optional: more subtle rotation or remove
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)', // Softer, more conventional hover shadow
    }}
    className="rounded-xl bg-gray-50 dark:bg-gray-800 p-6 shadow-lg dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-gray-700 transition-shadow duration-300" // Refined shadow
    role="article"
    aria-label={`Course card for ${result.course}`}
    // Optional: Make the whole card clickable
    // onClick={() => setSelectedCourse(result)}
    // style={{ cursor: 'pointer' }} // Add if making the whole card clickable
  >
    <div className="flex items-center gap-4 mb-6"> {/* Increased mb slightly for spacing */}
      <span className="text-4xl">{result.emoji}</span> {/* Slightly larger emoji if desired */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100"> {/* Standard text color for title, let brand colors come from accents like teal below */}
        {result.course}
      </h3>
    </div>

    <div className="mb-6"> {/* Added a wrapper for better spacing control */}
      <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Offered by:
      </h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        {result.universities.map((uni, i) => (
          <li key={uni.code || i} className="flex justify-between items-center"> {/* Use uni.code if unique, added items-center */}
            <span className="truncate pr-2"> {/* Added truncate and pr for long names */}
              {uni.name} <span className="text-gray-400 dark:text-gray-500">({uni.code})</span>
            </span>
            <span className="whitespace-nowrap font-medium text-orange-600 dark:text-orange-400"> {/* Added whitespace-nowrap */}
              Cutoff: {uni.cutoff}
            </span>
          </li>
        ))}
      </ul>
    </div>

    <button
      onClick={(e) => {
        // e.stopPropagation(); // Important if the parent div is also clickable
        setSelectedCourse(result);
      }}
      className="mt-auto w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-offset-gray-800 transition-all duration-200"
      aria-label={`More information about ${result.course}`}
    >
      <MessageCircle className="w-4 h-4" />
      More Info
    </button>
  </motion.div>
));

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
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'cutoff'
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const printRef = useRef();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Simulate API call; replace with actual endpoint
        setTimeout(() => {
          setCourses(dummyResultsData);
          setIsLoading(false);
        }, 1000);
        // Example: const response = await fetch('/api/courses');
        // const data = await response.json();
        // setCourses(data);
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
      setCurrentPage(1); // Reset to first page on search
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

    // Sort courses
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.course.localeCompare(b.course);
      } else {
        const aCutoff = parseFloat(a.universities[0]?.cutoff || 0);
        const bCutoff = parseFloat(b.universities[0]?.cutoff || 0);
        return bCutoff - aCutoff; // Descending order
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
              <CourseCard key={index} result={result} index={index} setSelectedCourse={setSelectedCourse} />
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
              <h2 className="text-3xl font-bold text-center text-teal-900 dark:text-teal-100 mb-6 tracking-tight">
                How to Apply on KUCCPS
              </h2>
              <ul className="space-y-4 text-base text-gray-700 dark:text-gray-200">
                <li className="flex items-center gap-3">
                  <LogIn className="text-orange-500 dark:text-orange-400" size={20} />
                  Log in to your KUCCPS student portal.
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="text-orange-500 dark:text-orange-400" size={20} />
                  Enter your KCSE index number in “Apply Now”.
                </li>
                <li className="flex items-center gap-3">
                  <Sliders className="text-orange-500 dark:text-orange-400" size={20} />
                  Input your 20 cluster weights.
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="text-orange-500 dark:text-orange-400" size={20} />
                  Select preferred degree courses by priority.
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-orange-500 dark:text-orange-400" size={20} />
                  Submit and confirm your application choices.
                </li>
                <li className="flex items-center gap-3">
                  <Download className="text-orange-500 dark:text-orange-400" size={20} />
                  Download the summary PDF for your records.
                </li>
              </ul>
              <div className="mt-8 flex flex-col items-center gap-4">
                <a
                  href="https://students.kuccps.net/login/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 dark:text-teal-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold transition"
                  aria-label="Visit KUCCPS portal"
                >
                  Go to KUCCPS Portal
                </a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowApplyPopup(false)}
                  className="bg-gradient-to-r from-teal-500 to-orange-500 hover:from-orange-500 hover:to-teal-500 dark:from-teal-600 dark:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300"
                  aria-label="Close application guide"
                >
                  Got it!
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
