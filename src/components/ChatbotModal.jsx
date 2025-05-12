export default function ChatbotModal({ closeModal }) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Chat with Us</h3>
        <div className="mb-4">
          {/* Placeholder chatbot iframe or widget */}
          <p>Chatbot functionality coming soon!</p>
        </div>
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-full"
        >
          Close Chat
        </button>
      </div>
    </div>
  );
}
