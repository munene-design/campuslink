// src/components/pages/ResultsPage.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';
import { Wind } from 'lucide-react';

// Data and Utils 
import { generateCoursePDF } from '../../utils/pdfGenerator';
import { dummyResultsData } from '../../data/dummyResults';

// Child Components 
import AIAdvisor from '../AIAdvisor';
import StarryBackground from '../results/StarryBackground';
import ResultsHeader from '../results/ResultsHeader';
import FilterBar from '../results/FilterBar';
import CourseCard from '../results/CourseCard';
import SkeletonCard from '../results/SkeletonCard';
import Pagination from '../results/Pagination';
import ResultsFooter from '../results/ResultsFooter';
import ApplyModal from '../results/ApplyModal';

const ResultsPage = () => {
  // --- STATE MANAGEMENT ---
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // We will now use setError
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [sortBy, setSortBy] = useState('cutoff');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  // --- DATA & LOGIC ---
  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null); // Reset error on new load
      setTimeout(() => {
        setCourses(dummyResultsData);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("Failed to load course data."); // Using setError here
      setIsLoading(false);
    }
  }, []);

  // FIXED: Added empty dependency array [] to useCallback
  const handleSearch = useCallback(debounce((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300), []);

  const filteredAndSortedCourses = useMemo(() => {
    if (!courses) return [];
    let filtered = courses.filter(
      (result) =>
        result.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.universities.some(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.course.localeCompare(b.course);
      const aCutoff = Math.max(...a.universities.map(u => parseFloat(u.cutoff) || 0));
      const bCutoff = Math.max(...b.universities.map(u => parseFloat(u.cutoff) || 0));
      return bCutoff - aCutoff;
    });
    return filtered;
  }, [courses, searchQuery, sortBy]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    return filteredAndSortedCourses.slice(startIndex, startIndex + coursesPerPage);
  }, [filteredAndSortedCourses, currentPage, coursesPerPage]);
  
  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);

  // --- DOWNLOAD HANDLER ---
  const handleDownloadPDF = async () => {
    if (filteredAndSortedCourses.length === 0) return alert("No courses to download.");
    setIsDownloading(true);
    try {
      await generateCoursePDF(filteredAndSortedCourses);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("An error occurred while generating the PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: coursesPerPage }).map((_, i) => <SkeletonCard key={i} />);
    }
    if (error) {
      return <p className="col-span-full text-center text-red-400">{error}</p>;
    }
    if (paginatedCourses.length === 0) {
      return (
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-20 bg-black/20 rounded-lg">
          <Wind size={48} className="mx-auto text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold text-white">No Matching Courses</h3>
          <p className="text-gray-400 mt-2">Widen your search to discover more opportunities.</p>
        </motion.div>
      );
    }
    return paginatedCourses.map((result, index) => (
      <CourseCard key={result.course} result={result} index={index} setSelectedCourse={setSelectedCourse} />
    ));
  };

  return (
    <div className="min-h-screen bg-[#0D0C22] text-gray-200 font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <StarryBackground />

      <div className="max-w-screen-xl mx-auto z-10 relative">
        <ResultsHeader />
        
        <FilterBar onSearch={handleSearch} sortBy={sortBy} onSortChange={setSortBy} />

        <main>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderContent()}
          </motion.div>
        </main>
        
        {!isLoading && (
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        )}

        <ResultsFooter 
            onDownload={handleDownloadPDF}
            onApplyClick={() => setShowApplyPopup(true)}
            isDownloading={isDownloading}
            isDownloadDisabled={!isLoading && filteredAndSortedCourses.length === 0}
        />
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
        
        {showApplyPopup && <ApplyModal onClose={() => setShowApplyPopup(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default ResultsPage;