import { useState } from "react";

const faqData = [
  {
    question: "What is KUCCPS?",
    answer:
      "KUCCPS is the Kenya Universities and Colleges Central Placement Service. It manages the placement of students to universities and colleges based on their KCSE results.",
  },
  {
    question: "How do I use this platform?",
    answer:
      "Simply input your KCSE grades, and we’ll calculate your cluster points and match you with the most suitable courses at universities across Kenya.",
  },
  {
    question: "What are cluster points?",
    answer:
      "Cluster points are calculated based on your KCSE subjects and grades. They determine the courses you qualify for at different universities.",
  },
  {
    question: "How can I check university cutoffs?",
    answer:
      "Once you’ve input your grades and cluster points, we’ll show you the courses and universities that fit your profile, including the current cutoffs.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 transition hover:shadow-lg border-blue-500"
            >
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.question}
                </h3>
                <div className="text-blue-600 text-lg">
                  {openIndex === index ? "-" : "+"}
                </div>
              </div>
              {openIndex === index && (
                <p className="text-gray-600 mt-4">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
