import React from "react";
import { Link } from "react-router-dom";
import imgFooter1 from ".././assets/imgs/footer/footer.png";
import imgFooter2 from ".././assets/imgs/footer/footer2.png";
const Footer = () => {
  return (
    <footer>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center px-6 md:px-20 lg:px-60 py-16 bg-gray-50 border-solid border-b-2">
        <div className="flex justify-center">
          <img src={imgFooter1} alt="Decor Left" className="max-w-[200px]" />
        </div>

        <div className="text-center md:text-left space-y-6">
          <h4 className="text-3xl md:text-4xl font-bold text-gray-800">
            Subscribe To Our Newsletter
          </h4>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin.
          </p>
          <div className="flex justify-center ">
            <button className="bg-black from-purple-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
              Subscribe Now
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img src={imgFooter2} alt="Decor Right" className="max-w-[200px]" />
        </div>
      </div>
      <div className="flex justify-center gap-96 mt-6 mb-10 items-center  ">
        <div>
          <h3 className="text-3xl font-bold text-gray-800 ">LUXE</h3>
        </div>
        <div className="flex gap-9 ">
          <Link to="" className="">
            Support Center
          </Link>
          <Link to="" className="">
            Invoicing
          </Link>
          <Link to="" className="">
            Contract
          </Link>
          <Link to="" className="">
            Careers
          </Link>
          <Link to="" className="">
            Blog
          </Link>
          <Link to="" className="">
            FAQ,s
          </Link>
        </div>
      </div>
      <div className="text-center text-sm md:text-base mb-6">
        Copyright © 2022{" "}
        <span className="font-semibold text-purple-400">LUXE</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
