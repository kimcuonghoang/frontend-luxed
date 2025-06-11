import React from "react";
import { CiTrophy } from "react-icons/ci";
import { LiaAwardSolid, LiaShippingFastSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
const ServicesShop = () => {
  return (
    <>
      <div className="flex gap-24 justify-center py-10">
        <div className="flex gap-2 items-center">
          <div>
            <CiTrophy className="text-5xl" />
          </div>
          <div>
            <p className="text-xl font-medium"> High Quality</p>
            <p>crafted from top materials</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <LiaShippingFastSolid className="text-5xl" />
          </div>
          <div>
            <p className="text-xl font-medium">Free Shipping</p>
            <p>Order over 150 $</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <LiaAwardSolid className="text-5xl" />
          </div>
          <div>
            <p className="text-xl font-medium">Warrany Protection</p>
            <p>Over 2 years</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <BiSupport className="text-5xl" />
          </div>
          <div>
            <p className="text-xl font-medium">24 / 7 Support</p>
            <p>Dedicated support</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesShop;
