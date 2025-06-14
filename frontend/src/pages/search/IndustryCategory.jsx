import React from "react";
import Layout from "../../components/Layout";
import SidebarLocationSelector from "../../components/SidebarLocationSelector";
import BuyerDashboard from "../buyer/BuyerDashboard";



const categories = [
  {
    name: "Agriculture",
    icon: "https://img.icons8.com/?size=100&id=263&format=png&color=000000",
  },
  {
    name: "Apparel",
    icon: "https://img.icons8.com/?size=100&id=6891&format=png&color=000000",
  },
  {
    name: "Automobiles & Motorcycles",
    icon: "https://img.icons8.com/?size=100&id=2169&format=png&color=000000",
  },
  {
    name: "Beauty & Personal Care",
    icon: "https://img.icons8.com/?size=100&id=79504&format=png&color=000000",
  },
  {
    name: "Chemicals",
    icon: "https://img.icons8.com/?size=100&id=58872&format=png&color=000000",
  },
  {
    name: "Building & Construction",
    icon:  "https://img.icons8.com/?size=100&id=uOd8uDQg0fOg&format=png&color=000000",
  },
  {
    name: "Consumer Electronics",
    icon: "https://img.icons8.com/?size=100&id=aiPGgCZu7wcB&format=png&color=000000",
  },
  {
    name: "Electrical Equipment & Supplies",
    icon: "https://img.icons8.com/?size=100&id=13890&format=png&color=000000",
  },
  {
    name: "Electronic Components & Supplies",
    icon: "https://img.icons8.com/?size=100&id=2171&format=png&color=000000",
  },
  {
    name: "Energy",
    icon: "https://img.icons8.com/?size=100&id=Qe1qJMHrHJ1R&format=png&color=000000",
  },
  {
    name: "Fashion Accessories",
    icon: "https://img.icons8.com/?size=100&id=19705&format=png&color=000000",
  },
  {
    name: "Food & Beverage",
    icon: "https://img.icons8.com/?size=100&id=Bf2UvtrwZszK&format=png&color=000000",
  },
  {
    name: "Furniture",
    icon: "https://img.icons8.com/?size=100&id=y2GWL3nrlTBH&format=png&color=000000",
  },
  {
    name: "Gifts & Crafts",
    icon: "https://img.icons8.com/?size=100&id=2476&format=png&color=000000",
  },
  {
    name: "Hardware",
    icon: "https://img.icons8.com/?size=100&id=7pVey42P-dtk&format=png&color=000000",
  },
  {
    name: "Health & Medical",
    icon: "https://img.icons8.com/?size=100&id=958&format=png&color=000000",
  },
  {
    name: "Home & Garden",
    icon: "https://img.icons8.com/?size=100&id=67307&format=png&color=000000",
  },
  {
    name: "Home Appliances",
    icon: "https://img.icons8.com/?size=100&id=1621&format=png&color=000000",
  },
  {
    name: "Lights & Lighting",
    icon: "https://img.icons8.com/?size=100&id=51815&format=png&color=000000",
  },
  {
    name: "Luggage, Bags & Cases",
    icon: "https://img.icons8.com/?size=100&id=2717&format=png&color=000000",
  },
  {
    name: "Machinery",
    icon: "https://img.icons8.com/?size=100&id=13885&format=png&color=000000",
  },
  {
    name: "Measurement & Analysis Instruments",
    icon: "https://img.icons8.com/?size=100&id=1212&format=png&color=000000",
  },
  {
    name: "Mechanical Parts & Fabrication Services",
    icon: "https://img.icons8.com/?size=100&id=11151&format=png&color=000000",
  },
  {
    name: "Minerals & Metallurgy",
    icon: "https://img.icons8.com/?size=100&id=54495&format=png&color=000000",
  },
  {
    name: "Office & School Supplies",
    icon: "https://img.icons8.com/?size=100&id=23662&format=png&color=000000",
  },
  {
    name: "Packaging & Printing",
    icon: "https://img.icons8.com/?size=100&id=123&format=png&color=000000",
  },
  {
    name: "Rubber & Plastics",
    icon: "https://img.icons8.com/?size=100&id=m_Tav_fDeSU7&format=png&color=000000",
  },
  {
    name: "Security & Protection",
    icon: "https://cdn-icons-png.flaticon.com/128/3064/3064197.png",
  },
  {
    name: "Service Equipment",
    icon: "https://img.icons8.com/?size=100&id=32383&format=png&color=000000",
  },
  {
    name: "Shoes & Accessories",
    icon: "https://img.icons8.com/?size=100&id=69628&format=png&color=000000",
  },
  {
    name: "Sports & Entertainment",
    icon: "https://img.icons8.com/?size=100&id=45691&format=png&color=000000",
  },
  {
    name: "Telecommunications",
    icon: "https://img.icons8.com/?size=100&id=2309&format=png&color=000000",
  },
  {
    name: "Textiles & Leather Products",
    icon: "https://img.icons8.com/?size=100&id=24900&format=png&color=000000",
  },
  {
    name: "Timepieces, Jewelry, Eyewear",
    icon: "https://img.icons8.com/?size=100&id=31248&format=png&color=000000",
  },
  {
    name: "Tools",
    icon: "https://img.icons8.com/?size=100&id=86057&format=png&color=000000",
  },
  {
    name: "Toys & Hobbies",
    icon: "https://img.icons8.com/?size=100&id=D5xmo9rNtora&format=png&color=000000",
  },
  {
    name: "Transportation",
    icon: "https://img.icons8.com/?size=100&id=241&format=png&color=000000",
  },
];

const IndustryCategory = () => {
  return (
    <>
    <Layout>
    <div className="max-w-screen-xl mx-auto px-4">
    <div className="px-8 py-10 bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
       Browse Buyers By Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
          >
            <img src={cat.icon} alt={cat.name} className="w-6 h-6" />
            <span className="text-sm">{cat.name}</span>
          </div>
        ))}
      </div>
      <SidebarLocationSelector/>
     
    
    </div>
    </div>
    </Layout>
    </>
  );
};

export default IndustryCategory;
