import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Contact Us
        </h1>
        <form className="space-y-5">
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full outline-none bg-transparent"
            />
          </div>

          <div className="flex items-start gap-3 border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <FaCommentDots className="text-gray-500 mt-1" />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full outline-none bg-transparent resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
