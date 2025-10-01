import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4 font-[serif]">
      {/* 404 Number */}
      <h1 className="text-[10rem] font-extrabold mb-2 tracking-widest text-gray-900">
        404
      </h1>

      {/* Sub Text */}
      <p className="text-lg mb-8 max-w-lg text-center text-gray-600 italic">
        Oops! Trang bạn tìm không tồn tại hoặc đã biến mất khỏi sàn diễn.
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="mb-12 px-8 py-3 uppercase tracking-widest border border-black text-black font-semibold hover:bg-black hover:text-white transition duration-300"
      >
        Quay lại trang chủ
      </Link>

      {/* Swiper Section */}
      <div className="w-full max-w-md">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <div className="p-6 border border-gray-200 bg-white shadow-sm text-center">
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">
                Trang không tìm thấy
              </h3>
              <p className="text-gray-500">
                Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="p-6 border border-gray-200 bg-white shadow-sm text-center">
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">
                Có thể bạn nhầm URL?
              </h3>
              <p className="text-gray-500">
                Đường dẫn có thể đã thay đổi hoặc trang đã bị gỡ bỏ.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="p-6 border border-gray-200 bg-white shadow-sm text-center">
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">
                Trở về ngay
              </h3>
              <p className="text-gray-500">
                Nhấn nút bên trên để trở về sàn diễn chính.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NotFound;
