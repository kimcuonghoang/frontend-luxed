import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import image from "../assets/imgs/deals/image.png";
import image1 from "../assets/imgs/deals/image1.png";
import image2 from "../assets/imgs/deals/image2.png";

const DealsOfTheMonth = () => {
  // Cài đặt đếm ngược tới 3 ngày sau
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + 3); // 3 ngày sau
    const difference = targetDate - now;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return difference > 0
      ? timeLeft
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      img: image2,
      label: "Spring Sale",
      discount: "30% OFF",
    },
    { img: image },
    { img: image1 },
  ];

  return (
    <div className="w-full bg-gray-100 py-28 pl-32 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="md:w-1/3  md:text-left">
          <h2 className="text-3xl font-bold mb-4">Deals Of The Month</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem scelerisque.
          </p>
          <div className="pb-8">
            <button className="inline-block bg-black text-white font-semibold py-3 px-10 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 text-center max-w-max">
              Buy Now
            </button>
          </div>

          {/* Countdown */}
          <h3 className="font-semibold text-lg mb-2">
            Hurry, Before It’s Too Late!
          </h3>
          <div className="flex gap-3 justify-center md:justify-start">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hr", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-300 rounded-md px-4 py-2 text-center shadow"
              >
                <div className="text-2xl font-bold">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Swiper */}
        <div className="md:w-2/3">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slidesPerView={3}
            spaceBetween={20}
            className="relative"
          >
            {slides.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.img}
                    alt={`slide-${idx}`}
                    className="w-full h-[400px] object-cover"
                  />
                  {item.discount && (
                    <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-md">
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="text-lg font-semibold">{item.discount}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation buttons */}
            <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow cursor-pointer">
              <FaArrowLeft />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow cursor-pointer">
              <FaArrowRight />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default DealsOfTheMonth;
