import React from "react";
import Slider from "react-slick";
import { Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Viss Lighting is one of top manufacturer in LED display & lighting industry over 7 years experience, especially at stage and...",
      name: "Shelly Luo",
      company: "Viss Lighting, China",
    },
    {
      quote:
        "exportersindia.com is a very useful and helpful marketplace. A person can find the required details of buyers & sellers ...",
      name: "Mr. Sagar Rathod",
      company: "Chamunda Krupa Tools, India",
    },
    {
      quote:
        "We are very happy to be the part of exportersindia. We got new valuable customers through this. Thanks for that. Continue y...",
      name: "Mr. Ramachandran. R",
      company: "Sabari Scientific Glass Equipments, India",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-8">Client Testimonial</h2>
        <div className="max-w-screen-xl mx-auto px-4">
        <Slider {...settings} className="-mx-0.5">
          {testimonials.map((item, i) => (
            <div key={i} className="px-0.5">
              <div className="bg-white border border-gray-200 rounded shadow-md p-8 h-[240px] w-[360px] mx-auto text-left flex flex-col justify-between">
                <Quote className="text-orange-600 w-6 h-6 mb-3" />
                <p className="text-gray-800 text-[14px] leading-relaxed mb-4 line-clamp-4">
                  {item.quote}
                </p>
                <div>
                  <p className="font-semibold text-[15px]">{item.name}</p>
                  <p className="text-gray-600 text-[14px]">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
