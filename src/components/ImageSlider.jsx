import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import img1 from "../assets/imgs/imgSilder/image.png";

const testimonials = [
  {
    img: img1,
    text: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    name: "James K.",
    role: "Traveler",
  },
  {
    img: img1,
    text: "This is the best purchase I’ve ever made. Simple, fast and reliable!",
    name: "Sarah M.",
    role: "Designer",
  },
  {
    img: img1,
    text: "Amazing experience! My customers love it and I do too!",
    name: "Brian W.",
    role: "Photographer",
  },
];

const TestimonialSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          This Is What Our Customers Say
        </h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-8 flex gap-6 items-center shadow-lg transition-all duration-300 scale-90 swiper-slide-active:scale-100">
                <div className="flex-shrink-0 w-28 h-28">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl shadow-md"
                  />
                </div>
                <div className="flex flex-col gap-3 text-left">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{item.text}"
                  </p>
                  <div className="border-t pt-2">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-8 gap-6">
          <button
            ref={prevRef}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-200 transition"
          >
            ❮
          </button>
          <button
            ref={nextRef}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-200 transition"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
