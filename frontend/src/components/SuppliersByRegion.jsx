import React, { useState } from "react";

const regions = [
  { name: "New Delhi", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRb8TB0Wo1YeJVwnJCSfSQth538uXh26fYLw&s" },
  { name: "Mumbai", img: "https://img.freepik.com/premium-vector/taj-mahal_951778-47356.jpg?semt=ais_hybrid&w=740" },
  { name: "Gurgaon", img: "https://img.freepik.com/premium-photo/there-is-watercolor-painting-building-with-crane-top-ai-generative_733139-48677.jpg" },
  { name: "Noida", img: "https://img.freepik.com/free-vector/beautiful-city-illustration-watercolor-effect_23-2147556583.jpg" },
  { name: "Bangalore", img: "https://img.freepik.com/premium-psd/bangalore-city-indian-illustration-realistic_1279565-9114.jpg" },
  { name: "Ahmedabad", img: "https://img.freepik.com/free-vector/hand-drawn-cadiz-illustration_52683-98373.jpg" },
  { name: "Kolkata", img: "https://img.freepik.com/free-photo/view-latin-american-village-with-nature-buildings_23-2151622026.jpg?semt=ais_hybrid&w=740" },
  { name: "Chennai", img: "https://img.freepik.com/free-vector/angkor-wat-siem-reap-watercolor-painting_53876-34776.jpg" },
  // Add more if needed
];

const SuppliersByRegion = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleRegions = showAll ? regions : regions.slice(0, 5); // show 8, then "More Cities"

  return (
    <div className="bg-white py-10 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Find Suppliers by Region
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {visibleRegions.map((region, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white p-4 rounded shadow-sm hover:shadow-md transition"
          >
            <div className="w-20 h-20 rounded-full border flex items-center justify-center overflow-hidden mb-2">
              <img
                src={region.img}
                alt={region.name}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {region.name}
            </span>
          </div>
        ))}

        {!showAll && (
          <div
            onClick={() => setShowAll(true)}
            className="flex flex-col items-center bg-white p-4 rounded shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full border flex items-center justify-center mb-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              More Cities
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersByRegion;
