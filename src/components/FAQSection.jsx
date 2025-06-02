import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, MousePointerClick, Calculator, ListChecks, ChevronDown } from "lucide-react"; // Changed MousePointerSquare to MousePointerClick

const faqData = [
  {
    question: "What is KUCCPS?",
    answer: "KUCCPS is the Kenya Universities and Colleges Central Placement Service. It's the body responsible for placing students in Kenyan universities and colleges based on their KCSE (Kenya Certificate of Secondary Education) results and chosen courses.",
    icon: Landmark,
    iconColor: "text-sky-500",
    bgColor: "bg-sky-100/70",
  },
  {
    question: "How do I use this platform?",
    answer: "Simply navigate to the 'Enter Grades' section, input your KCSE subject grades accurately. Our system will then calculate your cluster points for various course categories and show you a list of degree programs you are likely to qualify for based on recent cutoff points.",
    icon: MousePointerClick, // Corrected Icon Name
    iconColor: "text-pink-500",
    bgColor: "bg-pink-100/70",
  },
  {
    question: "What are cluster points?",
    answer: "Cluster points are a weighted score calculated from your performance in specific KCSE subjects. Different degree programs or 'clusters' (e.g., Engineering, Medicine, Arts) require a unique combination of subjects to calculate these points, determining your eligibility.",
    icon: Calculator,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-100/70",
  },
  {
    question: "How accurate are the cutoff predictions?",
    answer: "Our platform uses the most recently available KUCCPS cutoff points for guidance. However, cutoffs can vary slightly each year depending on the number of applicants and overall performance. Consider our recommendations as strong indicators, not absolute guarantees.",
    icon: ListChecks,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-100/70",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const faqItemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 },
  },
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-sky-100 via-rose-100 to-amber-100 py-16 sm:py-24 px-4 sm:px-6" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto">
            Find quick answers to common queries about CampusLink and the KUCCPS process.
          </p>
        </div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Can be changed to whileInView for scroll-triggered animation
          // viewport={{ once: true, amount: 0.2 }} // if using whileInView
        >
          {faqData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={faqItemVariants}
                className="bg-white rounded-xl shadow-lg shadow-pink-500/5 hover:shadow-pink-500/10 border border-transparent hover:border-purple-300/50 transition-all duration-300 ease-in-out overflow-hidden"
                layout
              >
                <motion.button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-xl group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`mr-4 p-2.5 rounded-full ${item.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
                      </span>
                      <h3 className="text-md sm:text-lg font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                      className="ml-2 text-purple-500 group-hover:text-purple-700 transition-colors"
                    >
                      <ChevronDown className="h-6 w-6" />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: "0px" }}
                      animate={{ opacity: 1, height: "auto", marginTop: "0px", paddingBottom: "20px" }}
                      exit={{ opacity: 0, height: 0, marginTop: "0px", paddingBottom: "0px" }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.05 }}
                      className="overflow-hidden" // Ensure content doesn't spill during animation
                    >
                      <div className="px-6 pb-1 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed pl-[4.25rem] sm:pl-[4.75rem]"> {/* Aligns with question text after icon */}
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}