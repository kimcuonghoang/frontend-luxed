import React from "react";

import image from "../assets/imgs/heroSection/image.png";
import image1 from "../assets/imgs/heroSection/images.png";
import image2 from "../assets/imgs/heroSection/images1.png";
import image3 from "../assets/imgs/heroSection/images2.png";
import sale from "../assets/imgs/heroSection/sale.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="flex  gap-10 mt-20 px-4 max-w-7xl mx-auto">
      <div className="flex-shrink-0">
        <img
          src={image}
          alt=""
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="grid gap-6 text-center max-w-md">
        <img src={image1} alt="" className="mx-auto rounded-md shadow-md" />

        <div>
          <h3 className="text-6xl md:text-7xl font-extrabold leading-tight">
            ULTIMATE
          </h3>
          <img src={sale} alt="" className="mx-auto my-4 " />
          <p className="text-xl md:text-2xl uppercase tracking-wide text-gray-700">
            NEW COLLECTION
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-block bg-black text-white font-semibold py-3 px-10 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 text-center max-w-max"
          >
            Shop Now
          </Link>
        </div>

        <img src={image2} alt="" className="mx-auto rounded-md shadow-md" />
      </div>

      <div className="flex-shrink-0">
        <img
          src={image3}
          alt=""
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
