// src/pages/CustomerSupport.jsx
import React from 'react';
import Layout from '../../components/Layout';

const CustomerSupport = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Customer Support</h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-600 mb-4">
          Welcome to our Customer Support center. Here, you can find help with common questions and issues.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Frequently Asked Questions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>How do I reset my password?</li>
            <li>How can I update my profile information?</li>
            <li>Where can I track my orders or inquiries?</li>
            <li>How do I delete my account?</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-4">If your question is not listed above, contact our support team below:</p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg"
              required
            />
            <textarea
              rows="4"
              placeholder="Describe your issue..."
              className="w-full border p-3 rounded-lg"
              required
            ></textarea>
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CustomerSupport;
