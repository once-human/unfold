import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Globe,
  BarChart3,
  ShieldCheck,
  Search,
} from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Global Marketplace",
      points: [
        "Access to global suppliers",
        "Industry-specific categories",
        "Verified business profiles",
      ],
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Efficient Procurement",
      points: [
        "Post inquiries easily",
        "Compare multiple quotations",
        "Secure transaction system",
      ],
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "Trust & Security",
      points: [
        "Verified business partners",
        "Data encryption",
        "GDPR compliant",
      ],
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handlePostInquiry = () => {
    navigate("/buyer/post-inquiry");
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-10"
        >
          {/* Heading */}
          <motion.div variants={item}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight font-crimson">
              Connect, Source, and Grow Your Business
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              The ultimate B2B platform connecting buyers with trusted suppliers across industries worldwide.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mt-6"
          >
            <input
              type="text"
              placeholder="Search Buy leads.."
              className="w-full sm:w-[500px] px-5 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-sm">
              <Search className="w-4 h-4" />
              Search
            </button>
          </motion.div>

          {/* Post Inquiry Button */}
          <motion.div variants={item} className="mt-4">
         <button
               onClick={handlePostInquiry}
               className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 hover:shadow-2xl animate-pulse"
              >
                 Post Your Requirement Now
           </button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 justify-items-center"
            variants={container}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center px-6"
                variants={item}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {feature.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
