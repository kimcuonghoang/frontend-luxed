import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-4">
        <h1 className="text-9xl font-extrabold mb-4 drop-shadow-lg">404</h1>
        <p className="text-xl mb-8 max-w-lg text-center drop-shadow-md">
          Oops! Trang bạn tìm không tồn tại hoặc đã bị xóa.
        </p>

        <Link
          to="/"
          className="mb-12 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition duration-300 font-semibold shadow-lg"
        >
          Quay lại trang chủ
        </Link>

        <div className="w-full max-w-md">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            <SwiperSlide>
              <div className="p-6 bg-indigo-800 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Trang không tìm thấy
                </h3>
                <p>Hãy kiểm tra lại đường dẫn hoặc quay lại trang chủ.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="p-6 bg-indigo-800 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Có thể bạn nhầm URL?
                </h3>
                <p>Đường dẫn có thể bị thay đổi hoặc trang đã bị gỡ.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="p-6 bg-indigo-800 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Chúng tôi ở đây giúp bạn!
                </h3>
                <p>Hãy nhấn nút quay lại để trở về trang chủ.</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default NotFound;
