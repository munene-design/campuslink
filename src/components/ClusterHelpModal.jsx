import React from 'react';
import { X } from 'lucide-react';

const ClusterHelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/90 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-purple-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          📊 How to Get Your KUCCPS Cluster Weights
        </h2>

        {/* Steps */}
        <ul className="space-y-4 text-gray-700">
          <li>
            🔐 <strong>Step 1:</strong> Visit the official KUCCPS student portal:
            <br />
            <a
              href="https://students.kuccps.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline hover:text-purple-800"
            >
              https://students.kuccps.net
            </a>
          </li>
          <li>
            🧾 <strong>Step 2:</strong> Log in using your KCSE Index Number, KCSE Year, and Password (Birth Certificate No or ID No).
          </li>
          <li>
            📈 <strong>Step 3:</strong> Click on <strong>"My Courses"</strong> or <strong>"Cluster Weights"</strong> section.
          </li>
          <li>
            ✍️ <strong>Step 4:</strong> Record the values shown for Clusters 1–20 and enter them into this form.
          </li>
        </ul>

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
          >
            Got It 👍
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClusterHelpModal;
