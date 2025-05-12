import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Sections
import BreakingNewsRibbon from './components/BreakingNewsRibbon';
import HeroSection from './components/HeroSection';
import UpdatesSection from './components/UpdatesSection';
import CTASection from './components/CTASection';
import EmailSignup from './components/EmailSignup';
import FAQSection from './components/FAQSection';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';

// Pages
import GradesPage from './components/pages/GradesPage';

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
                <FloatingActions />
                <Footer />
              </>
            }
          />
          <Route path="/enter-grades" element={<GradesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;