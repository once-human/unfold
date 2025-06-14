import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const industries = [
  { name: "Agriculture", img: "https://img.pikbest.com/png-images/20241029/an-agriculture-logo-sun-and-crops-icon_11024322.png!sw800" },
  { name: "Apparel", img: "https://cdn-icons-png.flaticon.com/512/5853/5853911.png" },
  { name: "Home Decor", img: "https://cdn-icons-png.flaticon.com/512/2621/2621957.png" },
  { name: "Automobile", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY3JqLCmCeMxuipq1Knjp90uZP31isBLx2hA&s" },
  { name: "Construction", img: "https://cdn-icons-png.freepik.com/512/3382/3382506.png" },
  { name: "Electrical", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEQenS3tGHJXn5T2WMeAQAKn1V9JMIBT56fA&s" },
  { name: "Textiles", img: "https://static.vecteezy.com/system/resources/previews/029/579/691/non_2x/color-icon-for-textiles-vector.jpg" },
  { name: "Furniture", img: "https://cdn-icons-png.freepik.com/512/10001/10001869.png" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const HowItWorks = () => {
  return (
    <section className="py-10 bg-white text-center">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        2,000+ Industrial Categories Standing By to Help
      </h2>

      <div className="max-w-screen-xl mx-auto px-4">
        <Slider {...settings}>
          {industries.map((industry, idx) => (
            <div key={idx} className="px-2">
              <div className="border rounded-md p-3 bg-white shadow-sm hover:shadow-md transition duration-300 h-[110px] md:h-[120px] lg:h-[130px] flex flex-col items-center justify-center">
                <img
                  src={industry.img}
                  alt={industry.name}
                  className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px] object-contain mb-2"
                />
                <p className="text-xs md:text-sm text-gray-700">{industry.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HowItWorks;
