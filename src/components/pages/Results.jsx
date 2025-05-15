import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BookOpen, MessageCircle, X } from 'lucide-react';

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
      doc.text(
        ` - ${uni.name} (${uni.code}) - Cutoff: ${uni.cutoff}`,
        15,
        yOffset
      );
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

const Results = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userQuery, setUserQuery] = useState('');

  const closeModal = () => {
    setSelectedCourse(null);
    setUserQuery('');
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

        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
          >
            <Download className="w-5 h-5" />
            Download PDF
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
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                {selectedCourse.emoji} {selectedCourse.course}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This is a brief intro about {selectedCourse.course}. It’s a dynamic field with strong career potential in Kenya and globally.
              </p>

              <div className="space-y-2 mb-3">
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Ask something about this course..."
                  className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                {userQuery && (
                  <div className="bg-gray-100 p-3 rounded-xl text-sm text-gray-700 shadow-inner">
                    <strong>AI Advisor:</strong> That’s a great question! {selectedCourse.course} is very versatile and leads to many opportunities like...
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Results;