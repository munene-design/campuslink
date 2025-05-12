import HeroSection from "./components/HeroSection";
import BreakingNewsRibbon from "./components/BreakingNewsRibbon";
import UpdatesSection from "./components/UpdatesSection";
import CTASection from "./components/CTASection";
import EmailSignup from "./components/EmailSignup";
import FAQSection from "./components/FAQSection";
import FloatingActions from "./components/FloatingActions";
import Footer from "./components/Footer";



function App() {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <BreakingNewsRibbon />
      <HeroSection />

      {/* <InteractiveGlobe /> ❌ Temporarily disabled */}

      <UpdatesSection />
      <CTASection />
      <EmailSignup />
      <FAQSection />
      <FloatingActions />
      <Footer />
    </div>
  );
}

export default App;
