 import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sections
import BreakingNewsRibbon from "./components/BreakingNewsRibbon";
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

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Router>
      <div className="font-sans bg-gray-50 text-gray-800">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BreakingNewsRibbon />
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
        </Routes>

        {/* Floating icons shared on all pages */}
        <FloatingActions />
      </div>
    </Router>
  );
}

export default App;