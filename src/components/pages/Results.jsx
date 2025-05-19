import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BookOpen, MessageCircle,CheckCircle, LogIn, FileText, Sliders,  } from 'lucide-react';
import AIAdvisor from '../AIAdvisor';
import { useRef } from 'react';
import html2canvas from 'html2canvas';


const dummyResultsData = [
  {
    course: "Medicine",
    emoji: "🩺",
    universities: [
      { name: "University of Nairobi", code: "124513", cutoff: "42.7" },
      { name: "Moi University", code: "125617", cutoff: "41.5" }
    ]
  },
  {
    course: "Law",
    emoji: "⚖",
    universities: [
      { name: "Kenyatta University", code: "124789", cutoff: "39.2" },
      { name: "Strathmore University", code: "126212", cutoff: "40.0" }
    ]
  },
  {
    course: "Engineering",
    emoji: "🛠",
    universities: [
      { name: "JKUAT", code: "125934", cutoff: "43.0" },
      { name: "Technical University of Kenya", code: "124999", cutoff: "41.8" }
    ]
  },
  {
    course: "Computer Science",
    emoji: "💻",
    universities: [
      { name: "Maseno University", code: "126001", cutoff: "39.6" },
      { name: "Kabarak University", code: "125855", cutoff: "38.9" }
    ]
  },
  {
    course: "Architecture",
    emoji: "🏛",
    universities: [
      { name: "University of Nairobi", code: "124513", cutoff: "42.0" },
      { name: "TUK", code: "124999", cutoff: "40.5" }
    ]
  },
  {
    course: "Education",
    emoji: "📚",
    universities: [
      { name: "Egerton University", code: "124320", cutoff: "37.2" },
      { name: "Kenyatta University", code: "124789", cutoff: "36.5" }
    ]
  },
  {
    course: "Nursing",
    emoji: "💉",
    universities: [
      { name: "Moi University", code: "125617", cutoff: "40.8" },
      { name: "JKUAT", code: "125934", cutoff: "41.0" }
    ]
  },
  {
    course: "Actuarial Science",
    emoji: "📈",
    universities: [
      { name: "Maseno University", code: "126001", cutoff: "39.4" },
      { name: "Strathmore University", code: "126212", cutoff: "41.0" }
    ]
  },
  {
    course: "Finance",
    emoji: "💰",
    universities: [
      { name: "University of Nairobi", code: "124513", cutoff: "38.3" },
      { name: "KCA University", code: "125400", cutoff: "37.0" }
    ]
  },
  {
    course: "Journalism",
    emoji: "📰",
    universities: [
      { name: "Multimedia University", code: "126300", cutoff: "36.0" },
      { name: "Daystar University", code: "126099", cutoff: "35.8" }
    ]
  }
];



const Results = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [messages, setMessages] = useState([]);
const [currentInput, setCurrentInput] = useState('');
const [showApplyPopup, setShowApplyPopup] = useState(false);
const printRef = useRef();
  const closeModal = () => {
    setSelectedCourse(null);
   
  };
 const handleDownloadStyledPDF = async () => {
  window.scrollTo(0, 0);
  const input = printRef.current;
  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('matched_courses_styled.pdf');
};
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] px-6 py-16 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center text-indigo-800 mb-12 drop-shadow-md"
        >
          <BookOpen className="inline-block w-8 h-8 mr-2 text-purple-700" />
          Matched Courses
        </motion.h2>

       <div ref={printRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyResultsData.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl bg-white/50 backdrop-blur-lg p-6 shadow-xl hover:shadow-2xl transition hover:scale-[1.02] border border-white/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{result.emoji}</span>
                <h3 className="text-xl font-semibold text-indigo-700">
                  {result.course}
                </h3>
              </div>
              <ul className="space-y-1 text-sm text-gray-700 pl-2 mb-4">
                {result.universities.map((uni, i) => (
                  <li key={i}>
                    {uni.name} <span className="text-gray-500">({uni.code})</span> —{" "}
                    <span className="font-medium">Cutoff: {uni.cutoff}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedCourse(result)}
                className="mt-2 text-sm font-medium text-purple-600 hover:underline"
              >
                <MessageCircle className="inline w-4 h-4 mr-1" />
                More Info
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleDownloadStyledPDF}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
  >
    <Download className="w-5 h-5" />
    Download PDF
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setShowApplyPopup(true)}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
  >
    <BookOpen className="w-5 h-5" />
    How to Apply
  </motion.button>
</div>

        <div className="flex flex-col items-center mt-10 text-center space-y-4">
          <p className="text-gray-700 max-w-xl text-sm md:text-base">
            If you have any issues with the application process or need help understanding how to apply, feel free to reach out to us for support.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:support@example.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0m0 0a9 9 0 0112.728 0zM12 8v4m0 4h.01" />
            </svg>
            Contact Support
          </motion.a>
        </div>
      </div>

      {/* AI Advisor Popup */}
      <AnimatePresence>
  {selectedCourse && (
    <AIAdvisor
      selectedCourse={selectedCourse}
      closeModal={closeModal}
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-6 text-gray-800"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowApplyPopup(false)}
          className="absolute top-4 right-4 text-xl text-indigo-700 hover:text-red-500 transition"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-5">
          How to Apply on KUCCPS
        </h2>

        {/* Steps List */}
        <ul className="space-y-4 text-sm">
          <li className="flex items-center gap-3">
            <LogIn className="text-indigo-600" size={20} />
            Log in to your KUCCPS student portal.
          </li>
          <li className="flex items-center gap-3">
            <FileText className="text-indigo-600" size={20} />
            Enter your KCSE index number in “Apply Now”.
          </li>
          <li className="flex items-center gap-3">
            <Sliders className="text-indigo-600" size={20} />
            Input your 20 cluster weights.
          </li>
          <li className="flex items-center gap-3">
            <BookOpen className="text-indigo-600" size={20} />
            Select preferred degree courses by priority.
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="text-indigo-600" size={20} />
            Submit and confirm your application choices.
          </li>
          <li className="flex items-center gap-3">
            <Download className="text-indigo-600" size={20} />
            Download the summary PDF for your records.
          </li>
        </ul>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <a
            href="https://students.kuccps.net/login/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-indigo-700 hover:text-indigo-900 text-sm"
          >
            Go to KUCCPS Portal
          </a>
          <button
            onClick={() => setShowApplyPopup(false)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition duration-300"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Results;