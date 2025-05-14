import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sections
import Navbar from "./components/Navbar"; // NEW: Import the Navbar

import HeroSection from "./components/HeroSection";
import UpdatesSection from "./components/UpdatesSection";
import CTASection from "./components/CTASection";
import EmailSignup from "./components/EmailSignup";
import FAQSection from "./components/FAQSection";
import FloatingActions from "./components/FloatingActions";
import Footer from "./components/Footer";

// Pages
import GradesPage from "./components/pages/GradesPage";
import ClusterWeightPage from "./components/pages/ClusterWeightPage";
import InterestSelectionPage from "./components/pages/InterestSelectionPage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Router>
      <div className="font-sans bg-gray-50 text-gray-800 scroll-smooth">
        <Routes>
          <Route
            path="/"
            element={
              <>
              
               
                <HeroSection />
                <UpdatesSection />
                <CTASection />
                <EmailSignup />
                <FAQSection />
                <Footer />
              </>
            }
          />
          <Route path="/enter-grades" element={<GradesPage />} />
          <Route path="/enter-cluster" element={<ClusterWeightPage />} />
          <Route path="/enter-interest" element={<InterestSelectionPage />} />
        </Routes>

        {/* Floating buttons always visible */}
        <FloatingActions />
        <Navbar /> {/* Added Fixed Menu */}
      </div>
    </Router>
  );
}

export default App;