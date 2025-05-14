import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const interests = [
  'Law & Justice ⚖️',
  'Business & Hospitality 🏨',
  'Media & Arts 🎭',
  'Earth & Environment 🌍',
  'Engineering ⚙️',
  'Architecture 🏛️',
  'Computing & Tech 💻',
  'Agribusiness 🚜',
  'Science 🔬',
  'Math & Finance 📊',
  'Fashion & Design 👗',
  'Sports & Fitness 🏋️',
  'Medicine & Health 🏥',
  'History & Culture 🏺',
  'Food & Environment 🥦',
  'Geography 🌄',
  'Languages 🌐',
  'Music 🎵',
  'Teaching 🧑‍🏫',
  'Religion & Philosophy 🕊️',
];

const InterestSelectionPage = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleInterest = (index) => {
    if (selectedInterests.includes(index)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== index));
    } else {
      setSelectedInterests([...selectedInterests, index]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-blue-100 py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-12" data-aos="fade-down">
          Select Your Areas of Interest 🎯
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {interests.map((interest, index) => {
            const isSelected = selectedInterests.includes(index);
            return (
              <div
                key={index}
                onClick={() => toggleInterest(index)}
                className={`cursor-pointer p-6 rounded-3xl backdrop-blur-xl shadow-md border transform transition-all duration-300 ease-in-out hover:scale-105 relative
                  ${
                    isSelected
                      ? 'bg-white/80 border-purple-500 shadow-purple-300 ring-2 ring-purple-400'
                      : 'bg-white/60 border-gray-200'
                  }`}
              >
                <div className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                  <span>{interest}</span>
                  {isSelected && (
                    <FaCheckCircle className="text-green-500 text-2xl animate-pulse" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {selectedInterests.length > 0 && (
          <div
            className="fixed bottom-5 left-0 right-0 flex justify-center"
            data-aos="fade-up"
          >
            <button
              onClick={() =>
                navigate('/course-results', {
                  state: { selectedInterests },
                })
              }
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              🎓 See Matching Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestSelectionPage;
