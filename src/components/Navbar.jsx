import React, { useState } from "react";
import { FaBars, FaTimes, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactPopup, setContactPopup] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md text-red shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wide">CampusLink 2025</div>

          <div className="hidden md:flex space-x-8 font-medium text-sm items-center">
            <button onClick={() => scrollTo("Home")} className="hover:text-yellow-300 transition">Home</button>
            <button onClick={() => scrollTo("updates")} className="hover:text-yellow-300 transition">Updates</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-yellow-300 transition">FAQ</button>
           
            <button
              onClick={() => setContactPopup(true)}
              className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Contact Us
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3 text-sm bg-white/10 backdrop-blur-md">
            <button onClick={() => scrollTo("Home")} className="block w-full text-left hover:text-yellow-300">Home</button>
            <button onClick={() => scrollTo("updates")} className="block w-full text-left hover:text-yellow-300">Updates</button>
            <button onClick={() => scrollTo("faq")} className="block w-full text-left hover:text-yellow-300">FAQ</button>
          
            <button
              onClick={() => {
                setContactPopup(true);
                setMenuOpen(false);
              }}
              className="block w-full text-left text-yellow-400 font-semibold"
            >
              Contact Us
            </button>
          </div>
        )}
      </nav>

      {/* Contact Popup */}
      {contactPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-80 p-6 rounded-2xl shadow-xl relative text-center">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setContactPopup(false)}
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold text-purple-700 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/254705290655"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center bg-green-500 text-white py-2 px-4 rounded-full shadow hover:bg-green-600 transition"
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
              <a
                href="mailto:munenei977@gmail.com"
                className="flex items-center gap-2 justify-center bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-600 transition"
              >
                <FaEnvelope /> Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;