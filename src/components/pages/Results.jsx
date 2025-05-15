import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { Download, BookOpen, X, LogIn, ClipboardList, CheckCircle } from 'lucide-react';

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

const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Course Match Results", 10, 10);
  let yOffset = 20;

  dummyResultsData.forEach((result, idx) => {
    doc.setFontSize(12);
    doc.text(`${idx + 1}. ${result.course}`, 10, yOffset);
    yOffset += 8;

    result.universities.forEach((uni) => {
      doc.text(` - ${uni.name} (${uni.code}) - Cutoff: ${uni.cutoff}`, 15, yOffset);
      yOffset += 6;
    });

    yOffset += 6;
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  });

  doc.save("matched_courses.pdf");
};

const howToApplySteps = [
  { icon: <LogIn className="w-4 h-4 text-indigo-600" />, text: "Go to the KUCCPS Student Portal." },
  { icon: <ClipboardList className="w-4 h-4 text-indigo-600" />, text: "Log in using your KCSE Index Number and Password." },
  { icon: <CheckCircle className="w-4 h-4 text-indigo-600" />, text: "Check your available courses based on your cluster points." },
  { icon: <BookOpen className="w-4 h-4 text-indigo-600" />, text: "Use this platform to compare your performance with cutoffs." },
  { icon: <ClipboardList className="w-4 h-4 text-indigo-600" />, text: "Choose courses that match your interest and performance." },
  { icon: <CheckCircle className="w-4 h-4 text-indigo-600" />, text: "Apply and confirm your course choices on the KUCCPS portal." },
];

const Results = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] px-6 py-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h3 className="text-xl font-semibold text-indigo-700">{result.course}</h3>
              </div>
              <ul className="space-y-1 text-sm text-gray-700 pl-2">
                {result.universities.map((uni, i) => (
                  <li key={i}>
                    {uni.name} <span className="text-gray-500">({uni.code})</span> — <span className="font-medium">Cutoff: {uni.cutoff}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center mt-12 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0m0 0a9 9 0 0112.728 0zM12 8v4m0 4h.01" />
            </svg>
            Contact Support
          </motion.a>
        </div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/50 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-6 max-w-lg w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-indigo-800">How to Apply</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-red-500 transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-3 text-sm text-gray-800">
              {howToApplySteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1">{step.icon}</span>
                  <span>{step.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Results;