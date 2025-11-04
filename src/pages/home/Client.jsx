import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tracstarsLogo from "../../assets/airesumelogo1.png";

const testimonials = [
  { text: "Tracstars Informatics made my job search so easy! I built my resume in minutes and landed my first interview within 24 hours." },
  { text: "We were able to hire quality talent faster than ever. The platform connects us with pre-screened candidates — super efficient." },
  { text: "I love how simple it is to match my skills with the right opportunities. Tracstars gave me the confidence to apply for better roles." },
  { text: "The automated notifications and resume builder saved me so much time. I applied to 5 companies in just a few clicks." },
  { text: "As an employer, Tracstars Informatics helps us find and onboard the right people quickly — no more long hiring cycles." },
];

const Client = () => {
  // Track window width so we can force slidesToShow on small screens
  const [slidesToShow, setSlidesToShow] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth < 768 ? 1 : 3;
    return 3;
  });

  useEffect(() => {
    const onResize = () => {
      setSlidesToShow(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener("resize", onResize);
    // also run on mount to ensure correct initial state
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: slidesToShow > 1, // show arrows on multi-slide layout
    responsive: [
      // keep a fallback but primary logic is slidesToShow state above
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2, slidesToScroll: 1, dots: true, arrows: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false, centerPadding: "0px", dots: true, arrows: false },
      },
    ],
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <img src={tracstarsLogo} alt="Tracstars Logo" className="h-12 mb-4 object-contain" />
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#001E3C] mb-8">What our users say</h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <style>
          {`
            /* Make slide children stretch to full width */
            .slick-slide { display: flex !important; justify-content: center; }
            .slick-slide > div { width: 100% !important; display:flex; align-items:stretch; }

            /* Small gutters on mobile so card doesn't touch edges */
            @media (max-width: 768px) {
              .slick-slide { padding-left: 8px; padding-right: 8px; }
              .slick-list { margin: 0 -8px; }
            }

            /* Keep arrows size reasonable */
            .slick-prev:before, .slick-next:before { font-size: 20px; }
          `}
        </style>

        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-3 w-full">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center h-full w-full">
                

                <p className="text-base md:text-lg text-[#001E3C] font-[Poppins] leading-relaxed text-center">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Client;
