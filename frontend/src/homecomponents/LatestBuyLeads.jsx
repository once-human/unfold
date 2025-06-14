import React from "react";
import { MapPin } from "lucide-react";


const offers = [
  {
    product: "Organic Basmati Rice",
    buyer: "Ayaan International",
    location: "India",
    time: "2 hours ago",
    img: "https://organictattva.com/cdn/shop/files/8906055440490_01_6e50e469-25d6-443d-81e0-60969f4354e8.png?v=1716208148&width=720",
  },
  {
    product: "Cotton T-Shirts",
    buyer: "Green Threads Ltd.",
    location: "Bangladesh",
    time: "5 hours ago",
    img: "https://assets.ajio.com/medias/sys_master/root/20230413/f2x6/64381739711cf97ba721ccee/-473Wx593H-443012128-orange-MODEL.jpg",
  },
  {
    product: "LED Bulbs",
    buyer: "BrightLite Co.",
    location: "China",
    time: "8 hours ago",
    img: "https://www.homesake.in/cdn/shop/files/IH0E671_theme.jpg?v=1704968677&width=1920",
  },
  {
    product: "Construction Steel Rods",
    buyer: "BuildStrong Group",
    location: "UAE",
    time: "Yesterday",
    img: "https://image.made-in-china.com/318f0j00fQlGupFPTHgh/%E8%A7%86%E9%A2%913.mp4.webp",
  },
  {
    product: "Herbal Cosmetics",
    buyer: "NatureGlow",
    location: "United States",
    time: "1 day ago",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL79XgcKwwYXkVIMEtmGDJNi2_BgxlZVFW-NJsBxqouHoBD94hNo47r2I15fI_INDUHho&usqp=CAU",
  },
];

const LatestBuyLeads = () => {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Latest Buy Leads
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Recently posted requirements from buyers around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="border rounded-md shadow-sm hover:shadow-md transition bg-white"
            >
              <img
                src={offer.img}
                alt={offer.product}
                className="w-full h-48 sm:h-40 object-cover rounded-t-md"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  {offer.product}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Buyer:</span> {offer.buyer}
                </p>
                <div className="flex items-center flex-wrap gap-x-2 text-sm text-gray-500">
                  <MapPin size={14} />
                  <span>{offer.location}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{offer.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBuyLeads;
