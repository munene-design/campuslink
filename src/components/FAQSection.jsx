import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "What is KUCCPS?",
    answer: "KUCCPS is the Kenya Universities and Colleges Central Placement Service that manages student placement to universities based on KCSE results.",
    icon: "🏛️"
  },
  {
    question: "How do I use this platform?",
    answer: "Input your KCSE grades to calculate cluster points and get matched with suitable courses across Kenyan universities.",
    icon: "🖥️"
  },
  {
    question: "What are cluster points?",
    answer: "Points calculated from your KCSE subjects that determine which university courses you qualify for.",
    icon: "📊"
  },
  {
    question: "How can I check cutoffs?",
    answer: "After entering your grades, we'll show matching courses and universities with current cutoffs.",
    icon: "🎯"
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Quick answers to common questions
          </p>
        </div>

        <div className="space-y-2">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-4 py-3 text-left focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{item.icon}</span>
                    <h3 className="text-base sm:text-lg font-medium text-gray-800">
                      {item.question}
                    </h3>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    className="ml-2 h-5 w-5 flex items-center justify-center text-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-3 pt-0"
                  >
                    <div className="text-sm sm:text-base text-gray-600 pl-7">
                      <p>{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}