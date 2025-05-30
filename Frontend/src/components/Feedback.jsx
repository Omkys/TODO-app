// src/components/Feedback.jsx
import { useState, useEffect } from "react";

function Feedback({ onClose }) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/xpwpnekg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, feedback }),
    });

    if (response.ok) {
      setSubmitted(true);
      setName("");
      setFeedback("");
    } else {
      alert("There was an issue submitting your feedback. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Thank you for your feedback!</h2>
          <button
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg transform transition-all duration-500 animate-slide-up">
        <h2 className="text-xl font-semibold mb-4">💬 We’d love your feedback!</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-md px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            rows="4"
            placeholder="Your Feedback"
            className="w-full border rounded-md px-3 py-2"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md transition-all"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
