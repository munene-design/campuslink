import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; // ✅ New
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
import Results from "./components/pages/Results"; // ✅ Results Page

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Router>
      <ScrollToTop /> {/* ✅ Smooth scroll to top on route change */}
      <div className="font-sans bg-gray-50 text-gray-800 scroll-smooth min-h-screen">
        <Navbar /> {/* ✅ Fixed Navbar */}

        <div className="pt-20"> {/* ✅ Add padding to avoid overlap with fixed Navbar */}
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
                  <Footer /> {/* ✅ Included only on landing */}
                </>
              }
            />
            <Route path="/enter-grades" element={<GradesPage />} />
            <Route path="/enter-cluster" element={<ClusterWeightPage />} />
            <Route path="/enter-interest" element={<InterestSelectionPage />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>

        <FloatingActions />
      </div>
    </Router>
  );
}

export default App;