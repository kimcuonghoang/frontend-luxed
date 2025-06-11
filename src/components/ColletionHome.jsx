import React from "react";
import chanel from "../assets/imgs/collections/chanel.png";
import lv from "../assets/imgs/collections/lv.png";
import prada from "../assets/imgs/collections/prada.png";
import calvin from "../assets/imgs/collections/calvin.png";
import denim from "../assets/imgs/collections/denim.png";
import { Link } from "react-router-dom";

const CollectionHome = () => {
  const brands = [
    { img: chanel, alt: "Chanel", to: "/brands/chanel" },
    { img: lv, alt: "Louis Vuitton", to: "/brands/lv" },
    { img: prada, alt: "Prada", to: "/brands/prada" },
    { img: calvin, alt: "Calvin Klein", to: "/brands/calvin" },
    { img: denim, alt: "Denim", to: "/brands/denim" },
  ];

  return (
    <div className="flex justify-center gap-10 my-20 px-4">
      {brands.map(({ img, alt, to }, idx) => (
        <Link key={idx} to={to}>
          <img
            src={img}
            alt={alt}
            className="h-6 w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-110"
            draggable={false}
          />
        </Link>
      ))}
    </div>
  );
};

export default CollectionHome;
