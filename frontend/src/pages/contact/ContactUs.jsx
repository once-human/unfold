// src/pages/ContactUs.jsx
import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            We'd love to hear from you! Please fill out the form and we'll get back to you as soon as possible.
          </p>
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
              rows="5"
              placeholder="Your Message"
              className="w-full border p-3 rounded-lg"
              required
            ></textarea>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Contact Info</h2>
          <p className="text-gray-600 mb-2"><strong>Address:</strong> 123 Market Street, City, Country</p>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> support@example.com</p>
          <p className="text-gray-600 mb-2"><strong>Phone:</strong> +1 234 567 890</p>
          <p className="text-gray-600 mt-4"><strong>Working Hours:</strong> Mon - Fri, 9:00AM - 6:00PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
