import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  categories,
  slides,
  subcategoryData,
} from "../data/categoryData"; // Externalized data

const CategorySidebar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (catName) => {
    if (isMobile) {
      setHoveredCategory((prev) => (prev === catName ? null : catName));
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
        {/* Sidebar */}
        <aside className="md:col-span-3 bg-white border rounded shadow-sm relative z-10">
          <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm md:text-base">
            Top Categories
          </div>

          <ul className="divide-y divide-gray-200">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => !isMobile && setHoveredCategory(cat.name)}
                onMouseLeave={() => !isMobile && setHoveredCategory(null)}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <li className="px-4 py-3 flex items-center gap-2 hover:bg-orange-500 hover:text-white cursor-pointer transition text-sm md:text-base">
                  <span>{cat.icon && React.createElement(cat.icon)}</span>
                  {cat.name === "All Categories" ? (
                    <Link to="/search/industry/all" className="flex-1">
                      {cat.name}
                    </Link>
                  ) : (
                    <span className="flex-1">{cat.name}</span>
                  )}
                  {subcategoryData[cat.name] && (
                    <span className="md:hidden ml-auto text-gray-500 text-lg">
                      {hoveredCategory === cat.name ? "▲" : "▼"}
                    </span>
                  )}
                </li>

                {/* Subcategory Panel */}
                {hoveredCategory === cat.name &&
                  subcategoryData[cat.name] && (
                    <div
                      className={`bg-white border rounded shadow-md p-4 text-sm z-50 ${
                        isMobile
                          ? "w-full static"
                          : "absolute md:left-full left-0 top-full md:top-0 w-full md:w-[720px] grid grid-cols-3 gap-4"
                      }`}
                    >
                      {Object.entries(subcategoryData[cat.name]).map(
                        ([sub, items], subIdx) => (
                          <div key={subIdx}>
                            <Link
                              to={`/category/${cat.name
                                .toLowerCase()
                                .replace(/ & /g, "-")
                                .replace(/\s+/g, "-")}/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="font-semibold text-blue-600 hover:text-orange-500 block mb-1"
                            >
                              {sub}
                            </Link>
                            <ul className="text-gray-600 space-y-1">
                              {items.slice(0, 3).map((item, i) => (
                                <li key={i}>
                                  <Link
                                    to={`/category/${cat.name
                                      .toLowerCase()
                                      .replace(/ & /g, "-")
                                      .replace(/\s+/g, "-")}/${sub
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}/${item
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    className="hover:text-orange-500 block"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  to={`/category/${cat.name
                                    .toLowerCase()
                                    .replace(/ & /g, "-")
                                    .replace(/\s+/g, "-")}/${sub
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="text-blue-500 hover:text-orange-500 block font-medium"
                                >
                                  View More
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}
          </ul>
        </aside>

        {/* Image Slider */}
        <div className="md:col-span-9 relative">
          <img
            src={slides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-48 md:h-full object-cover rounded"
          />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentSlide ? "bg-orange-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
